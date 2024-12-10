import { prisma } from "@/lib/prisma";
import { ProductoData } from "../../../types/ProductData";
import { obtenerProductos} from "../../../utils/producto";
import { authorizationPage } from "../../../utils/authorization";
import MetricasPedidos from "./pedidos/MetricasPedidos";
import MetricasProductos from "./productos/MetricasProductos";

const Page = async () => {
  await authorizationPage({ roles: ["admin", "editor"] });
  /**----------------Funciones que se utilizaran en ambos casos------------------------------------------------ */
  const calcularPromedio = (totalPrecio: number, cantidadProducto: number) => {
    return cantidadProducto > 0 ? totalPrecio / cantidadProducto : 0; // Previene la división por cero
  };

  /** -------------------------Data Productos------------------------------------------------------------------ */
  
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

  const sumaPrecioArray = arrayProductos.reduce((precioFinal: number, element: ProductoData) => {
    return precioFinal + (element.precio || 0); // Asegúrate de manejar precios nulos
  }, 0);

  const dataProducto = {
    totalProductos: arrayProductos.length,
    totalIngresos: sumaPrecioArray,
    valorPromedioProducto: calcularPromedio(sumaPrecioArray, arrayProductos.length),
  };

  /** -------------------------Data Productos------------------------------------------------------------------ */

  const PedidosDb = await prisma.pedido.findMany();
  console.log(PedidosDb);

  const totalPedidos = PedidosDb.length;

  const sumaTotalPedidos = PedidosDb.reduce((total, pedido) => total + (pedido.precio_final || 0), 0); // Asegúrate de sumar correctamente

  const dataPedido = {
    totalPedidos: totalPedidos,
    totalIngresos: sumaTotalPedidos,
    valorPromedioPedido: calcularPromedio(sumaTotalPedidos, totalPedidos),
  };

  return (
    <div>
      <MetricasPedidos/>
      {/* Aquí puedes incluir lógica para mostrar dataProducto y dataPedido */}
    </div>
  );
};

export default Page;
