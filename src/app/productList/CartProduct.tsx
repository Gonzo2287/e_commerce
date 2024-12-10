import React, { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { ProductoData } from '../../../types/ProductData';

interface ProductProps {
  product: ProductoData;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const addToCart = (producto: ProductoData) => {
    setCartItems([...cartItems, producto]);
  };

  return (
    <div className="border border-gray-300 p-4 mb-4 rounded-md">
      <h2 className="text-xl mb-2">{product.nombre}</h2>
      <p className="text-sm mb-2">{product.descripcion}</p>
      <img src={product.imagen} alt={product.nombre} className="mb-2" />
      <p className="text-lg mb-2">${product.precio.toFixed(2)}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
