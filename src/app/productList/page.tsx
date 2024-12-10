"use client"

import React, { useContext } from 'react';
import ProductList from './ProductList';
import Link from 'next/link'
import { CartContext } from '../../context/CartContext';

const Page = () => {
    const addToCart = () => {};
    const { cartItems } = useContext(CartContext);
    const numberOfCartItems = cartItems && cartItems.length || 0;   
    
    return (
      <div>
          <Link href="/carrito" className="flex place-content-end">Ir al Carrito de Compra ({numberOfCartItems} items)</Link>
          <ProductList/>
      </div>
    );
};

export default Page;