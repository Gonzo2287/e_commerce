'use client';
import { FaCheckCircle, FaBoxOpen, FaShippingFast, FaCheck } from "react-icons/fa";
import { useState, useEffect } from "react";


interface Etapa {
  nombre: string;
  icono: JSX.Element;
}

interface SeguimientoCompraProps {
  idPedido: number;
}

export default function SeguimientoCompra({ idPedido }: SeguimientoCompraProps) {
  const [estadoActual, setEstadoActual] = useState<string>("");

  const etapas: Etapa[] = [
    { nombre: "Preparando tu pedido", icono: <FaBoxOpen /> },
    { nombre: "Pedido listo", icono: <FaCheckCircle /> },
    { nombre: "Pedido despachado", icono: <FaShippingFast /> },
    { nombre: "Pedido entregado", icono: <FaCheck /> },
  ];

  const estadoEtapaMap: Record<string, string> = {
    RECIBIDO: "Preparando tu pedido",
    PREPARADO: "Pedido listo",
    DESPACHADO: "Pedido despachado",
    ENTREGADO: "Pedido entregado",
  };

  const obtenerEstadoPedido = async () => {
    try {
      const response = await fetch(`/api/pedido/${idPedido}`);
      const data = await response.json();

      if (estadoEtapaMap[data.estado]) {
        setEstadoActual(estadoEtapaMap[data.estado]);
      } else {
        console.warn("Estado no reconocido:", data.estado);
      }
    } catch (error) {
      console.error("Error al obtener el estado del pedido:", error);
    }
  };

  useEffect(() => {
    if (idPedido) obtenerEstadoPedido();
  }, [idPedido]);

  const estadoIndex = etapas.findIndex((etapa) => etapa.nombre === estadoActual);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Seguimiento de compra</h2>
      <ol className="flex items-center w-full text-xs text-gray-900 font-medium sm:text-base">
        {etapas.map((etapa, index) => (
          <li
            key={index}
            className={`flex w-full relative ${index <= estadoIndex ? "text-dark-blue" : "text-gray-900"
              } ${index < estadoIndex ? "after:bg-secondary-500" : "after:bg-gray-200"} ${index < etapas.length - 1
                ? "after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-14"
                : "" // No aplica `after` en la última etapa
              }`}
          >
            <div className="block whitespace-nowrap z-10">
              <span
                className={`w-6 h-6 lg:w-10 lg:h-10 flex justify-center items-center mx-auto mb-3 text-sm rounded-full ${index <= estadoIndex
                    ? "bg-secondary-500 text-white"
                    : "bg-gray-50 border-2 border-gray-200 text-secondary-500"
                  }`}
              >
                {etapa.icono}
              </span>
              <p className="text-center text-sm font-medium">{etapa.nombre}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>

  );

}
