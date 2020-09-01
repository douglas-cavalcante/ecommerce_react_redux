import { all, takeLatest, select, call, put } from 'redux-saga/effects';
import { addProductToCartSuccess, addProductToCartFailure } from './actions';
import { IState } from '../..';
import api from '../../../services/api';
import { AxiosResponse } from 'axios';

type CheckProductStockRequest = ReturnType<typeof addProductToCartSuccess>

interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock(action: CheckProductStockRequest) {
  const { product } = action.payload;

  const currentQuantity: number = yield select((state: IState) => {
    return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
  })

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

export default all([
  takeLatest('ADD_PRODUCT_TO_CART_REQUEST', checkProductStock)
])