const subscriptions = store => (req, res) => {
  res.status(200)
    .json(store.getState().subscriptions);
};

export default subscriptions;
