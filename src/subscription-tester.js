const subscriberNotifier = queue => (subscription) => {
  queue.send({
    type: 'notify',
    payload: subscription,
  });
};

const testSubscription = (
  web3,
  evaluateExpression,
  notifySubscriber,
) => (subscription) => {
  const { contractAddress, abi, testExpression } = subscription;
  const contract = web3.eth.contract(abi, contractAddress);
  return evaluateExpression(testExpression, contract)
    .then((value) => {
      if (value) {
        notifySubscriber(subscription);
      }
    });
};

const subscriptionTester = (
  web3,
  store,
  queue,
  evaluate,
) => () => Promise
  .all(store.getState().subscriptions
    .map(testSubscription(web3, evaluate, subscriberNotifier(queue))));

export default subscriptionTester;
