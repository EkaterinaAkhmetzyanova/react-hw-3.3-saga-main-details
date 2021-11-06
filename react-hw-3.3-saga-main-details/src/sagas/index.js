import { take, put, spawn, fork, call } from "redux-saga/effects";
import {
  fetchServicesSuccess,
  fetchServicesFailure,
  getServiceSuccess,
  getServiceFailure,
} from "../actions/actionCreators";
import {
  FETCH_SERVICES_REQUEST,
  GET_SERVICE_REQUEST,
} from "../actions/actionTypes";
import { requestServices } from "../api";

//worker
function* handleServicesRequestSaga() {
    try {
        const data = yield call(requestServices);
        yield put(fetchServicesSuccess(data));
    } catch (e) {
        yield put(fetchServicesFailure(e.message));
    }
}

//watcher
function* watchServicesRequestSaga() {
    while (true) {
        const action = yield take(FETCH_SERVICES_REQUEST);
        yield fork(handleServicesRequestSaga, action);
    }
}

//worker
function* handleServiceRequestSaga(action) {
    try {
        const data = yield call(requestServices, action.payload.id);
        yield put(getServiceSuccess(data));
    } catch (e) {
        yield put(getServiceFailure(e.message));
    }
}

//watcher
function* watchServiceRequestSaga() {
    while (true) {
        const action = yield take(GET_SERVICE_REQUEST);
        yield fork(handleServiceRequestSaga, action);
    }
}

export default function* saga() {
    yield spawn(watchServicesRequestSaga);
    yield spawn(watchServiceRequestSaga);
}