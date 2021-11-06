import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import saga from "../sagas";
import serviceListReducer from '../reducers/serviceList';
import serviceCardReducer from '../reducers/serviceCard';

const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceCard: serviceCardReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(saga);

export default store;