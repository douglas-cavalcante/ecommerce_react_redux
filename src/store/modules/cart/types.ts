export enum ActionTypes {
  addProductToCartRequest = 'ADD_TO_PRODUCT_TO_CART_REQUEST',
  addProductToCartSuccess= 'ADD_TO_PRODUCT_TO_CART_SUCESS',
  addProductToCartFailure = 'ADD_TO_PRODUCT_TO_CART_FAILURE',
}

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
