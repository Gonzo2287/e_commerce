import React, { 
  createContext, 
  useState, 
  ReactNode, 
  Dispatch, 
  SetStateAction, 
  useEffect, 
  useContext, 
} from 'react';
import { Header } from '@/components/Header';
import { Carrito } from '@/components/Carrito';
import { ProductoData } from '../../types/ProductData'; 
import { ComboData } from '../../types/ComboData';

export interface CartItem {
  producto?: ProductoData | { id_producto: string; nombre: string; precio: number; cantidad: number; descripcion: string; imagen: string; marca: string; tipo: string; precioOriginal: number };
  combo?: ComboData;
  cantidad: number;
}


interface CartContextType {
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  isCarritoVisible: boolean;
  setCarritoVisible: Dispatch<SetStateAction<boolean>>;
  clearCart: () => void; // Nueva función para limpiar el carrito
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
  isCarritoVisible: false,
  setCarritoVisible: () => {},
  clearCart: () => {}, // Función predeterminada
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCarritoVisible, setCarritoVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Función para limpiar el carrito
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems'); // Eliminar del almacenamiento local
  };

  

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        } catch (error) {
          console.error('Error al parsear los datos del carrito desde localStorage:', error);
        }
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      setCartItems,
      isCarritoVisible, 
      setCarritoVisible,
      clearCart // Agregar clearCart al proveedor
    }}>
      <Header />
      <Carrito />
      {isMounted && children} {/* Renderiza los hijos solo si el componente está montado */}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto del carrito
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext debe ser usado dentro de un CartProvider');
  }
  return context;
};

export { CartContext };
