import { all, takeLatest, select, call, put } from 'redux-saga/effects';
import { AddProductToCartRequestAction } from './types';
import { creators } from '.'
import { IState } from '../..';
import api from '../../../services/api';
import { AxiosResponse } from 'axios';
import { ActionTypes } from './types';


interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock(action: AddProductToCartRequestAction) {
  const { product } = action.payload;

  const currentQuantity: number = yield select((state: IState) => {
    return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
  })

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(creators.addProductToCartSuccess(product));
  } else {
    yield put(creators.addProductToCartFailure(product.id));
  }
}

export default [
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)
];