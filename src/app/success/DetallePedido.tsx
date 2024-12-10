
"use client";
import { useState, useEffect } from "react";
import { SessionStripe } from "../../../types/SessionStripe";

export default function DetallePedido({
  id,
  estadoCompra,
  totalSession,
  moneda,
  estadoPago,
  metodoPago,
  productos,
  usuarioId,  // Asegúrate de recibir el userId aquí

}: SessionStripe & { usuarioId: number }) {
  const [puntosTotales, setPuntosTotales] = useState<number>(0);
  //const [puntosGanados, setPuntosGanados] = useState<number>(0); // Estado para puntos ganados en la compra
  const total = totalSession ? totalSession / 100 : 0;
  const puntosGanados = total ? Math.floor(total / 100) : 0;

  useEffect(() => {
    const obtenerPuntosTotales = async () => {
      try {
        console.log("ID de usuario:", usuarioId);
        const response = await fetch(`/api/usuario/${usuarioId}`); // Usa backticks aquí
        const data = await response.json();
        setPuntosTotales(data.puntos);
      } catch (error) {
        console.error("Error al obtener puntos:", error);
      }
    };

    obtenerPuntosTotales();
  }, [usuarioId]);

  
  const estadoCompraFormateado = estadoCompra === "complete" ? "Completado" : estadoCompra;

  return (
    <div className="text-black flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h1 className="text-3xl text-center font-semibold mb-6 text-black">Detalle del Pedido</h1>
      <div className="py-8">
        {id ? (
          <div className="bg-white border-2 rounded-lg p-6 shadow-lg text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-dark-blue mb-4">
              Código de pedido: <span className="text-dark-blue">#{id}</span>
            </h2>
            <p className="text-lg text-gray-800 mb-2">Fecha: {new Date().toLocaleDateString()}</p>
            <p className="text-lg text-gray-800 mb-2">
              Método de Pago: {metodoPago.length > 0 ? (metodoPago[0] === "card" ? "Tarjeta de Crédito" : metodoPago[0]) : "Desconocido"}

            </p>
            <p className="text-lg text-gray-800 mb-2">
              Estado: <span className="text-lg text-gray-800 mb-2">{estadoCompraFormateado}</span>
            </p>
            <p className="text-lg text-dark-blue mb-4">
              Total: <span className="font-semibold text-dark-blue">${total.toFixed(2)}</span>
            </p>
            <p className="text-md font-medium text-gray-800 mb-2">
              Puntos ganados en esta compra:{" "}
              <span className="font-semibold text-gray-800">{puntosGanados}</span>
            </p>
            <p className="text-md font-medium text-gray-800 mb-6">
              Puntos totales acumulados:{" "}
              <span className="font-semibold text-gray-800">{puntosTotales}</span>
            </p>

            <h3 className="text-xl font-semibold text-secondary-600 mb-4">Productos:</h3>
            <div className="flex flex-col items-center">
              {productos.map((producto, index) => (
                <div
                  key={index}
                  className="mb-2 bg-light-blue p-4 rounded-md shadow-sm w-full max-w-md hover:border-secondary-700 hover:shadow-xl transition-all duration-200"
                >
                  <ul>
                    <li className="text-lg text-gray-800">
                      <span className="font-semibold text-black">Producto:</span>{" "}
                      {producto.nombre}
                    </li>
                    <li className="text-lg text-gray-800">
                      <span className="font-semibold text-black">Cantidad:</span>{" "}
                      {producto.cantidad} unidades
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-xl font-semibold text-secondary-600 bg-secondary-100 py-4 px-6 rounded-md shadow-md max-w-md mx-auto">
            No hay pedidos disponibles.
          </p>
        )}
      </div>
    </div>

  );
}