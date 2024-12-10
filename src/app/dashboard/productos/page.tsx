import React from 'react';
import MetricasProductos from './MetricasProductos';
import { obtenerProductos } from '../../../../utils/producto';
import { ProductoData } from '../../../../types/ProductData';

const Page = async () => {

    const calcularPromedio = (totalPrecio: number, cantidadProducto: number) => {
        return cantidadProducto > 0 ? totalPrecio / cantidadProducto : 0; // Previene la división por cero
    };

    const response = await obtenerProductos();

    // Verifica si la respuesta es un array antes de procesarla
    const arrayProductos: ProductoData[] = Array.isArray(response)
        ? response.map((producto: any) => ({
            id_producto: producto.id_producto,
            nombre: producto.nombre || "",           // Asignar cadena vacía si es null
            descripcion: producto.descripcion || "",  // Asignar cadena vacía si es null
            imagen: producto.imagen || "",
            precio: producto.precio || 0,
            cantidad: producto.cantidad || 0,
            marca: producto.marca || "",
            tipo: producto.tipo || "",
        }))
        : []; // Si no es un array, inicializa productos como un array vacío

    const sumaPrecioArray = arrayProductos.reduce((precioFinal, element) => {
        return precioFinal + (element.precio || 0); // Asegúrate de manejar precios nulos
    }, 0);
  
    const dataProducto = {
        totalProductos: arrayProductos.length,
        totalIngresos: sumaPrecioArray,
        valorPromedioProducto: calcularPromedio(sumaPrecioArray, arrayProductos.length),
    };

    return (
        <div className="h-96">
            <MetricasProductos data={dataProducto} />
        </div>
    );
}

export default Page;
