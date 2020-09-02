import React, { useCallback } from 'react';
import { IProduct } from '../store/modules/cart/types';
import { useDispatch, useSelector } from 'react-redux';
import { creators, selectors } from '../store/modules';

interface CatalogItemProps {
  product: IProduct;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const hasFailedStockCheck = useSelector(selectors.cart.getFailedStockCheck).includes(product.id);

 const testeSelector = useSelector(selectors.cart.testSelector);
  
  const handleAddProductToCart = useCallback(() => {
    dispatch(creators.cart.addProductToCartRequest(product))
  }, [dispatch, product]);


  return (
    <article key={product.id}>
      <strong>{product.title}</strong> {" - "}
      <span>{product.price}</span> {" "}
      <button type="button" onClick={handleAddProductToCart}>Comprar</button>

      {hasFailedStockCheck && <span>Em falta</span>}

    </article >
  )
}

export default CatalogItem;