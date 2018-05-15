export const subscribe = (subscriptionId, contractAddress, abi, expression) => ({
  type: 'SUBSCRIBE',
  payload: {
    subscriptionId,
    contractAddress,
    abi,
    expression,
  },
});

export const unsubscribe = subscriptionId => ({
  type: 'UNSUBSCRIBE',
  payload: {
    subscriptionId,
  },
});

export const massSubscribe = subscriptions => ({
  type: 'MASS_SUBSCRIBE',
  payload: {
    subscriptions,
  },
});

export const setBlockWatcherAlive = () => ({
  type: 'SET_STATUS',
  payload: {
    key: 'blockWatcher',
    value: 'ok',
  },
});

export const setControlQueueAlive = () => ({
  type: 'SET_STATUS',
  payload: {
    key: 'controlQueue',
    value: 'ok',
  },
});

export const setControlQueueSubscribed = () => ({
  type: 'SET_STATUS',
  payload: {
    key: 'controlQueueSubscription',
    value: 'ok',
  },
});

export const setNotificationQueueAlive = () => ({
  type: 'SET_STATUS',
  payload: {
    key: 'notificationQueue',
    value: 'ok',
  },
});
