import watchForNewBlocks from '../block-watcher';

describe('block-watcher', () => {
  let mockWeb3;

  beforeEach(() => {
    mockWeb3 = {
      eth: {
        subscribe: () => undefined,
      },
    };
  });

  it('subscribes to web3.eth newBlockHeaders', () => {
    mockWeb3.eth.subscribe = jest.fn();
    watchForNewBlocks(mockWeb3, 99);
    expect(mockWeb3.eth.subscribe).toHaveBeenCalledWith('newBlockHeaders', 99);
  });
});
