/*
import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

function* subscribe(action) {
  const { contractAddress } = action.payload;
  yield call(subscribeToContractEvents, contractAddress, onEvent({ log, store }));
  yield put({ type: "SUBSCRIBED", contractAddress });
};

function* unsubscribe(action) {
  const { contractAddress } = action.payload;
  yield call(unsubscribeFromContractEvents, contractAddress, onEvent({ log, store }));
  yield put({ type: 'SUBSCRIBED', contractAddress });
}

function* watchSubscribe() {
  yield takeEvery('SUBSCRIBE', subscribe);
}

function* watchUnsubscribe() {
  yield takeEvery('UNSUBSCRIBE', unsubscribe);
}

*/

function* rootSaga() {
  /*
  yield all([
    fork(watchSubscribe),
    fork(watchUnsubscribe),
  ]);
  */
}

export default rootSaga;
