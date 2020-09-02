import { action, createReducer } from 'typesafe-actions'
// Actions 

import { ICartState, IProduct, ActionTypes, CardActions } from "./types";

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: []
};

const cartCreator = {
  addProductToCartRequest: (product: IProduct): CardActions =>
    action(ActionTypes.addProductToCartRequest, {
      product,
    }),
  addProductToCartSuccess: (product: IProduct): CardActions =>
    action(ActionTypes.addProductToCartSuccess, {
      product,
    }),
  addProductToCartFailure: (productId: number): CardActions =>
    action(ActionTypes.addProductToCartFailure, {
      productId
    })
};


// Reducers

const cartReducer = createReducer<ICartState, CardActions>(INITIAL_STATE)
  .handleType(ActionTypes.addProductToCartSuccess, (state, action) => {
    const { product } = action.payload;

    const productInCartIndex = state.items.findIndex(item =>
      item.product.id === product.id
    );

    if (productInCartIndex >= 0) {
      const newState = state.items.map(item => {
        if(item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }
        return item;
      })
      return {
        ...state,
        items: [
          ...newState,
        ]
      }
    } else {
      return {
        ...state,
        items: [
          ...state.items,
          {
            product,
            quantity: 1,
          }
        ]
      }
    }
  })
  .handleType(ActionTypes.addProductToCartFailure, (state, action) => {
    const { productId } = action.payload;
    return {
      ...state,
      failedStockCheck: [
        ...state.failedStockCheck,
        productId
      ]
    }
  })

export { cartReducer, cartCreator };