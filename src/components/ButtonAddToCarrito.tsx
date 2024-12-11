import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import { ProductoData } from "../../types/ProductData";
import { ComboData } from "../../types/ComboData";
import { Button } from "@/components/ui/button";
import { CarritoData } from "../../types/CarritoData";

type Props = {
  producto?: ProductoData;
  combo?: ComboData;
  cantidad: number;
};

export const ButtonAddToCarrito = ({ producto, combo, cantidad }: Props) => {
  const { cartItems, setCartItems, setCarritoVisible } = useContext(CartContext);

  // Función para agregar un producto individual al carrito
  const addToCart = (producto: ProductoData, cantidad: number) => {
    const existingItem = cartItems.find(item => item.producto?.id_producto === producto.id_producto);

    if (existingItem) {
        // Si el producto ya existe, actualiza la cantidad
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.producto?.id_producto === producto.id_producto
                    ? { ...item, producto: { ...item.producto, cantidad: item.producto.cantidad + cantidad } } // Modifica la cantidad aquí
                    : item
            )
        );
    } else {
        // Si no existe, agrega el producto al carrito
        setCartItems(prevItems => [
            ...prevItems,
            { producto: { ...producto, cantidad }, cantidad } // Agregar el producto con la cantidad inicial
        ]);
    }
};

  // Función para calcular el precio total de un combo con el descuento aplicado
const calculateComboPrice = (combo: ComboData): number => {
  // Calcular el precio total de los productos del combo (antes de descuento)
  const totalPrecioProductos = combo.productos.reduce(
    (total, comboProducto) => total + comboProducto.precioDescuento,
    0
  );
  return totalPrecioProductos ;
};

// Función para agregar un combo como un solo producto al carrito
const addComboToCart = (combo: ComboData, cantidad: number) => {
  const precioFinal = calculateComboPrice(combo); // Calcular el precio con descuento

  const comboProducto: ProductoData = {
    id_producto: `combo-${combo.id_combo}`, // Convertimos en string asegurado
    nombre: combo.nombre, // Nombre del combo
    precio: precioFinal, // Precio con descuento del combo
    cantidad, // La cantidad seleccionada del combo
    descripcion: "", // Puede dejarse vacío si no aplica
    imagen: "", // Lo mismo para la imagen
    marca: "", // Lo mismo para la marca
    tipo: "" // Lo mismo para el tipo
  };

  const existingItem = cartItems.find(
    item => item.producto?.id_producto === comboProducto.id_producto
  );

  if (existingItem) {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.producto?.id_producto === comboProducto.id_producto
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      )
    );
  } else {
    setCartItems(prevItems => [
      ...prevItems,
      { producto: comboProducto, cantidad } // Agregar combo completo
    ]);
  }
};

  // Función que se ejecuta al hacer clic en el botón
  const handleAddToCart = () => {
    if (producto) {
      addToCart(producto, cantidad); // Si es un producto, lo agrega al carrito
    } else if (combo) {
      addComboToCart(combo, cantidad); // Si es un combo, lo agrega como un solo producto
    }
    setCarritoVisible(true); // Hacer visible el carrito
  };

  return (
    <Button
      className="bg-primary-500 shadow-inner shadow-primary-700 text-xl text-white hover:bg-primary-700"
      onClick={handleAddToCart}
    >
      Comprar
    </Button>
  );
};
