import {
  subscribe,
  unsubscribe,
  massSubscribe,
  setBlockWatcherAlive,
  setControlQueueAlive,
  setControlQueueSubscribed,
  setNotificationQueueAlive,
} from '../actions';

describe('subscribe', () => {
  it('builds a subscribe action', () => {
    expect(subscribe(1, 2, 3, 4)).toEqual({
      type: 'SUBSCRIBE',
      payload: {
        subscriptionId: 1,
        contractAddress: 2,
        abi: 3,
        expression: 4,
      },
    });
  });
});

describe('unsubscribe', () => {
  it('builds an unsubscribe action', () => {
    expect(unsubscribe(17)).toEqual({
      type: 'UNSUBSCRIBE',
      payload: {
        subscriptionId: 17,
      },
    });
  });
});

describe('massSubscribe', () => {
  it('builds a massSubscribe action', () => {
    expect(massSubscribe([1, 2, 3])).toEqual({
      type: 'MASS_SUBSCRIBE',
      payload: {
        subscriptions: [1, 2, 3],
      },
    });
  });
});

describe('setBlockWatcherAlive', () => {
  it('builds a setBlockWatcherAlive action', () => {
    expect(setBlockWatcherAlive()).toEqual({
      type: 'SET_STATUS',
      payload: {
        key: 'blockWatcher',
        value: 'ok',
      },
    });
  });
});

describe('setControlQueueAlive', () => {
  it('builds a setControlQueueAlive action', () => {
    expect(setControlQueueAlive()).toEqual({
      type: 'SET_STATUS',
      payload: {
        key: 'controlQueue',
        value: 'ok',
      },
    });
  });
});

describe('setControlQueueSubscribed', () => {
  it('builds a setControlQueueSubscribed action', () => {
    expect(setControlQueueSubscribed()).toEqual({
      type: 'SET_STATUS',
      payload: {
        key: 'controlQueueSubscription',
        value: 'ok',
      },
    });
  });
});

describe('setNotificationQueueAlive', () => {
  it('builds a setNotificationQueueAlive action', () => {
    expect(setNotificationQueueAlive()).toEqual({
      type: 'SET_STATUS',
      payload: {
        key: 'notificationQueue',
        value: 'ok',
      },
    });
  });
});
