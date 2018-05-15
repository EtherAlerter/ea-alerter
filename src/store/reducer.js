const initialState = {
  subscriptions: [],
  status: {
    blockWatcher: 'offline',
    controlQueue: 'offline',
    controlQueueSubscription: 'offline',
    notificationQueue: 'offline',
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUBSCRIBE': {
      const {
        subscriptionId,
        contractAddress,
        abi,
        expression,
      } = action.payload;
      return {
        ...state,
        subscriptions: [
          ...state.subscriptions,
          {
            subscriptionId,
            contractAddress,
            abi,
            expression,
          },
        ],
      };
    }
    case 'UNSUBSCRIBE': {
      const { subscriptionId } = action.payload;
      return {
        ...state,
        subscriptions: state.subscriptions.filter(s => s.subscriptionId !== subscriptionId),
      };
    }
    case 'SET_STATUS': {
      const { key, value } = action.payload;
      return {
        ...state,
        status: {
          ...state.status,
          [key]: value,
        },
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
