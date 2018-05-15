const status = store => (req, res) => {
  res.status(200)
    .json({
      message: 'ea-alerter is alive',
      status: store.getState().status,
    });
};

export default status;
