import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules/rootReducer';
import { ICartState } from './modules/cart/types';

import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './modules/rootSaga';

export interface IState {
  cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
);
sagaMiddleware.run(rootSaga)

export default store;