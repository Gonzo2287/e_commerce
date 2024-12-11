import SeguimientoCompra from "@/components/SeguimientoCompra";
import { getPedidos } from "../../../utils/getPedidos";

export const dynamic = 'force-dynamic';

export default async function MisCompras() {
  try {
    let pedidos = await getPedidos();
    
    // Ordenar pedidos del más reciente al más antiguo
    pedidos = pedidos.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Mis Compras</h1>
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <div key={pedido.id_pedido} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <h2 className="text-dark-blue text-xl font-semibold">Pedido #{pedido.id_pedido}</h2>
              <p className="text-gray-600">Fecha: {new Date(pedido.fecha).toLocaleDateString()}</p>
              <p className="text-gray-800 text-lg font-bold">Total: ${pedido.precio_final}</p>
              <h3 className="text-lg font-semibold mt-4">Productos:</h3>
              <ul className="mt-2 space-y-2">
                {pedido.productos.map((pedidoProducto) => (
                  <li key={`${pedidoProducto.id_pedido}-${pedidoProducto.id_producto}`} className="flex items-center justify-between border-b border-gray-300 pb-2">
                    <div className="flex items-center space-x-4">
                      {pedidoProducto.producto.imagen && (
                        <img src={pedidoProducto.producto.imagen} className="w-16 h-16 object-cover rounded-md" />
                      )}
                      <div>
                        <p className="text-md font-medium">{pedidoProducto.producto.nombre}</p>
                        <p className="text-sm text-gray-500">Cantidad: {pedidoProducto.cantidad} unidades</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <SeguimientoCompra idPedido={pedido.id_pedido} />
            </div>
          ))
        ) : (
          <p className="text-gray-600">No tienes compras realizadas.</p>
        )}
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="flex justify-center">
        <p className="text-xl font-semibold">No hay compras realizadas</p>
      </div>
    );
  }
}
