import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import * as cart from './cart';

export const reducers = combineReducers({
  cart: cart.reducer
});

export function* rootSaga() {
  return yield all([
    ...cart.sagas,
  ])
}

export const creators = {
  cart: cart.creators,
}

export const selectors = {
  cart: cart.selectors
}

export type ReduxState = ReturnType<typeof reducers>;

