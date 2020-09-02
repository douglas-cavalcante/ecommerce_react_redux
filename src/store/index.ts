import { createStore, applyMiddleware } from 'redux';
import { ICartState } from './modules/cart/types';

import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers, rootSaga } from './modules/index';

export interface IState {
  cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
);

sagaMiddleware.run(rootSaga)

export default store;