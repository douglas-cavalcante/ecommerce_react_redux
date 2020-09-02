export enum ActionTypes {
  addProductToCartRequest = 'ADD_TO_PRODUCT_TO_CART_REQUEST',
  addProductToCartSuccess = 'ADD_TO_PRODUCT_TO_CART_SUCESS',
  addProductToCartFailure = 'ADD_TO_PRODUCT_TO_CART_FAILURE',
}

// Retornos dos actions
export interface AddProductToCartRequestAction {
  type: ActionTypes.addProductToCartRequest,
  payload: { product: IProduct },
}

interface AddProductToCartSuccessAction {
  type: ActionTypes.addProductToCartSuccess
  payload: { product: IProduct },
}

interface AddProductToCartFailureAction {
  type: ActionTypes.addProductToCartFailure
  payload: {
    productId: number
  },
}

export type CardActions =
  AddProductToCartRequestAction |
  AddProductToCartSuccessAction |
  AddProductToCartFailureAction;

export interface IProduct {
  id: number;
  title: string;
  price: number;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICartState {
  items: ICartItem[];
  failedStockCheck: number[],
}
