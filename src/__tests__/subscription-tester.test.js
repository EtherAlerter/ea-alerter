import subscriptionTester from '../subscription-tester';

describe('subscription-tester', () => {
  let testSubscription;
  let mockContract;
  let mockWeb3;
  let mockStore;
  let mockQueue;
  let mockEvaluate;

  beforeEach(() => {
    mockContract = 17;
    mockWeb3 = {
      eth: {
        contract: () => mockContract,
      },
    };
    mockStore = {
      getState: () => ({
        subscriptions: [
          {
            testExpression: 12,
          },
        ],
      }),
    };
    mockQueue = 'abc';
    mockEvaluate = jest.fn((() => Promise.resolve()));
    testSubscription = subscriptionTester(mockWeb3, mockStore, mockQueue, mockEvaluate);
  });

  it('tests a single subscription', () => {
    testSubscription().then(() => {
      expect(mockEvaluate).toHaveBeenCalledWith(12, mockContract);
    }).catch(() => {
      throw Error('Expected evaluate to have been called');
    });
  });

  it('tests each subscriptions', () => {
    mockStore.getState = () => ({
      subscriptions: [
        {
          testExpression: 12,
        },
        {
          testExpression: 77,
        },
        {
          testExpression: 146,
        },
      ],
    });
    testSubscription().then(() => {
      expect(mockEvaluate).toHaveBeenCalledTimes(3);
    }).catch(() => {
      throw Error('Expected evaluate to have been called 3 times');
    });
  });

  describe('when expression is true', () => {
    beforeEach(() => {
      mockQueue = {
        send: jest.fn(),
      };
      mockEvaluate = () => Promise.resolve(true);
      testSubscription = subscriptionTester(mockWeb3, mockStore, mockQueue, mockEvaluate);
    });

    it('sends notification', () => {
      testSubscription().then(() => {
        expect(mockQueue.send).toHaveBeenCalledWith({
          type: 'notify',
          payload: {
            testExpression: 12,
          },
        });
      }).catch(() => {
        throw Error('Expected queue to send to have been called');
      });
    });
  });

  describe('when expression is false', () => {
    beforeEach(() => {
      mockQueue = {
        send: jest.fn(),
      };
      mockEvaluate = () => Promise.resolve(false);
      testSubscription = subscriptionTester(mockWeb3, mockStore, mockQueue, mockEvaluate);
    });

    it('does not send notification', () => {
      testSubscription().then(() => {
        expect(mockQueue.send).not.toHaveBeenCalled();
      }).catch(() => {
        throw Error('Expected queue.send() to have been called');
      });
    });
  });
});
