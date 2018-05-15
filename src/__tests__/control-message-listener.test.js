import onControlMessage from '../control-message-listener';

describe('control-message-listener', () => {
  describe('onControlMessage()', () => {
    let onMessage;
    let mockLog;
    let mockStore;
    let mockActions;

    beforeEach(() => {
      mockLog = {
        info: () => undefined,
        error: () => undefined,
      };
      mockStore = {
        dispatch: () => undefined,
      };
      mockActions = {
        subscribe: () => undefined,
        unsubscribe: () => undefined,
      };
      onMessage = onControlMessage(mockLog, mockStore, mockActions);
    });

    describe('errors', () => {
      beforeEach(() => {
        mockLog.error = jest.fn();
      });

      it('logs and ignores empty messages', () => {
        onMessage();
        expect(mockLog.error).toHaveBeenCalledWith('Empty message (msg = undefined)');
      });

      it('logs and ignores non-object messages', () => {
        onMessage('abc');
        expect(mockLog.error).toHaveBeenCalledWith('Non-object message (msg = "abc")');
      });

      it('logs and ignores messages with no action', () => {
        onMessage({});
        expect(mockLog.error).toHaveBeenCalledWith('No action (msg = {})');
      });
    });

    describe('subscribe', () => {
      let mockMsg;

      beforeEach(() => {
        mockMsg = {
          action: 'subscribe',
          payload: {
            subscriptionId: 12,
            contractAddress: 'abc123',
            abi: 'someAbiDefinitionBits',
            expression: {
              complex: 'totally',
            },
          },
        };
      });

      it('builds a subscribe action', () => {
        mockActions.subscribe = jest.fn();
        onMessage(mockMsg);
        expect(mockActions.subscribe).toHaveBeenCalledWith(12, 'abc123', 'someAbiDefinitionBits', { complex: 'totally' });
      });

      it('dispatches the subscribe action', () => {
        const mockAction = 9;
        mockActions.subscribe = () => mockAction;
        mockStore.dispatch = jest.fn();
        onMessage(mockMsg);
        expect(mockStore.dispatch).toHaveBeenCalledWith(mockAction);
      });

      describe('errors', () => {
        beforeEach(() => {
          mockLog.error = jest.fn();
        });

        it('logs and ignores empty payloads', () => {
          onMessage({ action: 'subscribe' });
          expect(mockLog.error).toHaveBeenCalledWith('Empty payload (msg = {"action":"subscribe"})');
        });

        it('logs and ignores empty subscription ids', () => {
          onMessage({ action: 'subscribe', payload: {} });
          expect(mockLog.error).toHaveBeenCalledWith('No subscription id (msg = {"action":"subscribe","payload":{}})');
        });

        it('logs and ignores empty contract addresses', () => {
          onMessage({ action: 'subscribe', payload: { subscriptionId: 17 } });
          expect(mockLog.error).toHaveBeenCalledWith('No contract address (msg = {"action":"subscribe","payload":{"subscriptionId":17}})');
        });
      });
    });

    describe('unsubscribe', () => {
      let mockMsg;

      beforeEach(() => {
        mockMsg = {
          action: 'unsubscribe',
          payload: {
            subscriptionId: 17,
          },
        };
      });

      it('builds an unsubscribe action', () => {
        mockActions.unsubscribe = jest.fn();
        onMessage(mockMsg);
        expect(mockActions.unsubscribe).toHaveBeenCalledWith(17);
      });

      it('dispatches the unsubscribe action', () => {
        const mockAction = 9;
        mockActions.unsubscribe = () => mockAction;
        mockStore.dispatch = jest.fn();
        onMessage(mockMsg);
        expect(mockStore.dispatch).toHaveBeenCalledWith(mockAction);
      });

      describe('errors', () => {
        beforeEach(() => {
          mockLog.error = jest.fn();
        });

        it('logs and ignores empty payloads', () => {
          onMessage({ action: 'unsubscribe' });
          expect(mockLog.error).toHaveBeenCalledWith('Empty payload (msg = {"action":"unsubscribe"})');
        });

        it('logs and ignores empty subscription IDs', () => {
          onMessage({ action: 'unsubscribe', payload: {} });
          expect(mockLog.error).toHaveBeenCalledWith('No subscription id (msg = {"action":"unsubscribe","payload":{}})');
        });
      });
    });
  });
});
