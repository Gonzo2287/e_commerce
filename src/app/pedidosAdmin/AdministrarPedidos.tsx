"use client";

import { EstadoPedido } from "@prisma/client";
import { useEffect, useState } from "react";
import CargandoSpinner from "@/components/CargandoSpinner";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface Pedido {
  id_pedido: number;
  id_stripe: string;
  id_usuario: number;
  fecha: Date;
  metodo_pago: string;
  estadoCompra: string;
  estadoPedido: EstadoPedido;
  precio_final: number;
  recargos: number;
  descuentos: number;
  productos: { id_producto: number; cantidad: number }[];
  usuario: { nombre: string; apellido: string } | null;
}

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function cargarPedidos() {
    try {
      const response = await fetch("/api/pedido");
      const data = await response.json();
      const pedidosOrdenados = data.sort(
        (a: Pedido, b: Pedido) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
  
      setPedidos(pedidosOrdenados);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
      setLoading(false);
    }
  }

  async function handleEstadoChange(id_pedido: number, nuevoEstado: EstadoPedido) {
    try {
      await fetch(`/api/pedido`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_pedido, estadoPedido: nuevoEstado }),
      });
      cargarPedidos();
    } catch (error) {
      console.error("Error al actualizar el estado del pedido:", error);
    }
  }

  useEffect(() => {
    cargarPedidos();
  }, []);

  if (loading) {
    return <CargandoSpinner />; 
  }

  return (
    <div className="p-6">
  <h2 className="text-2xl font-bold mb-6 text-center">Administrar Pedidos</h2>
  <div className="overflow-x-auto">
    <Table
      aria-label="Tabla de pedidos"
      className="max-w-5xl mx-auto border border-gray-300 bg-white rounded-xl text-sm cursor-default"
    >
      <TableHeader>
        <TableColumn className="bg-light-blue font-semibold text-black rounded-l-xl text-center py-2 px-2 text-lg sm:text-lg">
          ID PEDIDO
        </TableColumn>
        <TableColumn className="bg-light-blue font-semibold text-black text-center py-2 px-2 text-lg sm:text-lg">
          CLIENTE
        </TableColumn>
        <TableColumn className="bg-light-blue font-semibold text-black text-center py-2 px-2 text-lg sm:text-lg">
          FECHA
        </TableColumn>
        <TableColumn className="bg-light-blue font-semibold text-black rounded-r-xl text-center py-2 px-2 text-lg sm:text-lg">
          ESTADO
        </TableColumn>
      </TableHeader>

      <TableBody className="divide-y divide-gray-200">
        {pedidos.map((pedido) => (
          <TableRow key={pedido.id_pedido} className="hover:bg-gray-50 transition">
            <TableCell className="text-center py-2 px-4 text-lg xs:text-lg">
              {pedido.id_pedido}
            </TableCell>
            <TableCell className="text-center py-2 px-4 text-lg sm:text-lg">
              {pedido.usuario
                ? `${pedido.usuario.nombre} ${pedido.usuario.apellido}`
                : "Sin nombre"}
            </TableCell>
            <TableCell className="text-center py-2 px-4 text-lg sm:text-lg">
              {new Date(pedido.fecha).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-center py-2 px-4 text-lg sm:text-lg">
              <div className="flex justify-center">
                <select
                  value={pedido.estadoPedido}
                  onChange={(e) =>
                    handleEstadoChange(
                      pedido.id_pedido,
                      e.target.value as EstadoPedido
                    )
                  }
                  className="block w-full max-w-xs border border-gray-300 bg-white text-gray-700 py-2 pl-3 pr-10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 sm:text-lg"
                >
                  <option
                    value="RECIBIDO"
                    className="py-2 pl-3 pr-10 text-gray-700 hover:bg-primary-100 hover:text-primary-700"
                  >
                    Recibido
                  </option>
                  <option
                    value="PREPARADO"
                    className="py-2 pl-3 pr-10 text-gray-700 hover:bg-primary-100 hover:text-primary-700"
                  >
                    Preparado
                  </option>
                  <option
                    value="DESPACHADO"
                    className="py-2 pl-3 pr-10 text-gray-700 hover:bg-primary-100 hover:text-primary-700"
                  >
                    Despachado
                  </option>
                  <option
                    value="ENTREGADO"
                    className="py-2 pl-3 pr-10 text-gray-700 hover:bg-primary-100 hover:text-primary-700"
                  >
                    Entregado
                  </option>
                </select>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
</div>




  );
}
