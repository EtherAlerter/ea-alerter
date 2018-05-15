import R from 'ramda';

const defined = (message, f = R.identity, e = Error) => (v) => {
  if (!f(v)) {
    throw e(message);
  }
  return v;
};

const isObject = (message, f = R.identity, e = Error) => (v) => {
  if (typeof f(v) !== 'object') {
    throw e(message);
  }
  return v;
};

const validateSubscribePayload = R.pipe(
  defined('Empty payload'),
  defined('No subscription id', R.prop('subscriptionId')),
  defined('No contract address', R.prop('contractAddress')),
  defined('No ABI', R.prop('abi')),
  defined('No expression', R.prop('expression')),
);

const validateUnsubscribePayload = R.pipe(
  defined('Empty payload'),
  defined('No subscription id', R.prop('subscriptionId')),
);

const dispatchSubscribe = (log, store, actions) => ({
  subscriptionId,
  contractAddress,
  abi,
  expression,
}) => {
  store.dispatch(actions.subscribe(subscriptionId, contractAddress, abi, expression));
};

const dispatchUnsubscribe = (log, store, actions) => ({ subscriptionId }) => {
  store.dispatch(actions.unsubscribe(subscriptionId));
};

const handlers = {
  subscribe: (log, store, actions) => R.pipe(
    validateSubscribePayload,
    dispatchSubscribe(log, store, actions),
  ),
  unsubscribe: (log, store, actions) => R.pipe(
    validateUnsubscribePayload,
    dispatchUnsubscribe(log, store, actions),
  ),
};

const handlerLookup = f => v => handlers[f(v)];

const validateMessage = R.pipe(
  defined('Empty message'),
  isObject('Non-object message'),
  defined('No action', R.prop('action')),
  defined('Unrecognized action', handlerLookup(R.prop('action'))),
);

const processMessage = (log, store, actions) => ({ action, payload }) => {
  handlers[action](log, store, actions)(payload);
};

const onControlMessage = (log, store, actions) => (msg) => {
  try {
    R.pipe(
      validateMessage,
      processMessage(log, store, actions),
    )(msg);
  } catch (e) {
    log.error(`${e.message} (msg = ${JSON.stringify(msg)})`);
  }
};

export default onControlMessage;
