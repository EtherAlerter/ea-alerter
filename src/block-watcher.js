const watchForNewBlocks = (web3, onNewBlock) => {
  web3.eth.subscribe('newBlockHeaders', onNewBlock);
};

export default watchForNewBlocks;
