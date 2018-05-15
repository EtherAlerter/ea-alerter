import connectToQueue from '../alerter-queue';

describe('alerter-queue', () => {
  let mockChannel;
  let mockConnection;
  let mockLog;
  let mockAmqp;
  let mockUrl;
  let mockName;
  let result;

  beforeEach(() => {
    mockChannel = {
      assertQueue: jest.fn(),
      sendToQueue: jest.fn(),
      consume: jest.fn((name, callback) => {
        callback({
          content: JSON.stringify({ message: 'I have a ham radio' }),
        });
      }),
    };
    mockConnection = {
      createChannel: jest.fn((callback) => {
        callback(null, mockChannel);
      }),
    };
    mockLog = {
      info: () => undefined,
      warn: () => undefined,
      error: () => undefined,
    };
    mockAmqp = {
      connect: jest.fn((url, callback) => {
        callback(null, mockConnection);
      }),
    };
    mockUrl = 'http://someurl';
    mockName = 'myQueue';
  });

  describe('successful calls', () => {
    beforeEach(() => {
      result = connectToQueue(
        mockLog,
        mockAmqp,
        mockUrl,
        mockName,
        {
          retryCount: 1,
          retryDelay: 1,
        },
      );
    });

    it('tries to connect', () => {
      expect.assertions(1);
      return result.then(() => {
        expect(mockAmqp.connect).toHaveBeenCalledWith(mockUrl, expect.any(Function));
      });
    });

    it('creates the channel', () => {
      expect.assertions(1);
      return result.then(() => {
        expect(mockConnection.createChannel).toHaveBeenCalledWith(expect.any(Function));
      });
    });

    it('asserts the queue', () => {
      expect.assertions(1);
      return result.then(() => {
        expect(mockChannel.assertQueue).toHaveBeenCalledWith(mockName, { durable: false });
      });
    });

    it('resolves an object that can send to the channel', () => {
      expect.assertions(1);
      return result.then((o) => {
        o.send('I have a ham radio');
        expect(mockChannel.sendToQueue).toHaveBeenCalledWith(mockName, 'I have a ham radio');
      });
    });

    it('resolves an object that can subscribe to the channel', () => {
      expect.assertions(1);
      return result.then((o) => {
        o.subscribe(() => undefined);
        expect(mockChannel.consume).toHaveBeenCalledWith(
          mockName,
          expect.any(Function),
          { noAck: true },
        );
      });
    });

    it('calls the subscribed onMsg handler', () => {
      expect.assertions(1);
      return result.then((o) => {
        const onMsg = jest.fn();
        o.subscribe(onMsg);
        expect(onMsg).toHaveBeenCalledWith({ message: 'I have a ham radio' });
      });
    });
  });

  it('fails if the connect fails', () => {
    expect.assertions(1);
    mockAmqp.connect = jest.fn((url, callback) => {
      callback('Something went wrong');
    });
    result = connectToQueue(mockLog, mockAmqp, mockUrl, mockName, { retryCount: 1, retryDelay: 1 });
    return result.then(() => {
      throw Error('Should have thrown');
    }).catch((e) => {
      expect(e).toEqual('Something went wrong');
    });
  });

  it('fails if the createChannel fails', () => {
    expect.assertions(1);
    mockConnection.createChannel = jest.fn((callback) => {
      callback('Something went wrong');
    });
    result = connectToQueue(mockLog, mockAmqp, mockUrl, mockName, { retryCount: 1, retryDelay: 1 });
    return result.then(() => {
      throw Error('Should have thrown');
    }).catch((e) => {
      expect(e).toEqual('Something went wrong');
    });
  });

  it('retries if something fails', () => {
    expect.assertions(2);
    mockAmqp.connect = jest.fn();
    mockAmqp.connect.mockImplementationOnce((url, callback) => { callback('Something went wrong'); });
    mockAmqp.connect.mockImplementationOnce((url, callback) => { callback('Something went wrong'); });
    mockAmqp.connect.mockImplementationOnce((url, callback) => { callback('Something went wrong'); });
    mockAmqp.connect.mockImplementationOnce((url, callback) => { callback('Something went wrong'); });
    mockAmqp.connect.mockImplementationOnce((url, callback) => { callback(null, mockConnection); });
    result = connectToQueue(mockLog, mockAmqp, mockUrl, mockName, { retryDelay: 1 });
    return result.then(() => {
      expect(mockAmqp.connect).toHaveBeenCalledTimes(5);
      expect(mockConnection.createChannel).toHaveBeenCalled();
    });
  });
});
