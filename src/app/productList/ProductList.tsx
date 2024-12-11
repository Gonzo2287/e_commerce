"use client";

import React, { useState, useEffect, useContext } from 'react';
import Product from './CartProduct';
import { CartContext } from '../../context/CartContext';
import { ProductoData } from '../../../types/ProductData';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductoData[]>([]);
  const context = useContext(CartContext);

  const addToCart = (product: ProductoData) => {
    context.setCartItems((prevItems) => [...prevItems, product]);
  };

  return (
    <div className="product-list">
      <h1>Products</h1>
      {products.map(product => (
        <div key={product.id_producto}>
          <Product product={product} />
          <button onClick={() => addToCart(product)}>Añadir al carrito</button>
        </div>
      ))}
      <h2>Carrito</h2>
      <ul>
        {context.cartItems.map(item => (
         <li key={item.producto?.id_producto}>{item.producto?.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
