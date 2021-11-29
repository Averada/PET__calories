import MAIN from "./reducers/MAIN";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import initState from "./initState";
import { composeWithDevTools } from "redux-devtools-extension";
import watchAddLoad from "./saga";
import createSagaMiddleware from "redux-saga";
import { saveState, saveStateInfo } from "./actionCreators/localStorage";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  MAIN,
  initState,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
);

store.subscribe(async () => {
  saveState(store.getState().auth);
  saveStateInfo(store.getState().info);

});

sagaMiddleware.run(watchAddLoad);

export default store;
