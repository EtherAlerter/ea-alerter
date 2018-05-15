import R from 'ramda';
import rootReducer from '../reducer';

describe('reducer', () => {
  it('produces the initial state', () => {
    expect(rootReducer(undefined, {})).toEqual({
      subscriptions: [],
      status: {
        blockWatcher: 'offline',
        controlQueue: 'offline',
        controlQueueSubscription: 'offline',
        notificationQueue: 'offline',
      },
    });
  });

  describe('actions', () => {
    const startingState = (base = {}) => R.mergeDeepRight(
      {
        subscriptions: [],
        status: {
          blockWatcher: 'ok',
          controlQueue: 'ok',
          controlQueueSubscription: 'ok',
          notificationQueue: 'ok',
        },
      },
      base,
    );

    it('handles SUBSCRIBE', () => {
      expect(rootReducer(
        startingState(),
        {
          type: 'SUBSCRIBE',
          payload: {
            subscriptionId: 'abc',
            contractAddress: '0xabc',
            abi: 'someAbi',
            expression: 'someExpression',
          },
        },
      )).toEqual(startingState({
        subscriptions: [
          {
            subscriptionId: 'abc',
            contractAddress: '0xabc',
            abi: 'someAbi',
            expression: 'someExpression',
          },
        ],
      }));
    });

    it('handles UNSUBSCRIBE', () => {
      expect(rootReducer(
        startingState({
          subscriptions: [
            { subscriptionId: '9' },
            { subscriptionId: '27' },
            { subscriptionId: '42' },
          ],
        }),
        {
          type: 'UNSUBSCRIBE',
          payload: {
            subscriptionId: '27',
          },
        },
      )).toEqual(startingState({
        subscriptions: [
          { subscriptionId: '9' },
          { subscriptionId: '42' },
        ],
      }));
    });

    it('handles SET_STATUS', () => {
      expect(rootReducer(
        startingState(),
        {
          type: 'SET_STATUS',
          payload: {
            key: 'ham_radio',
            value: 'I have a',
          },
        },
      )).toEqual(startingState({
        status: {
          ham_radio: 'I have a',
        },
      }));
    });
  });
});
