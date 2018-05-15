import { createStore } from 'redux';
import rootReducer from './reducer';
import * as actions from './actions';

export const initializeStore = () => createStore(rootReducer);

export { actions };
