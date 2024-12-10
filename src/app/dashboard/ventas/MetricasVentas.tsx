import React from 'react';

interface PropsMetricasVentas {
  data: {
    productosMasVendidos: { nombre: string; cantidad: number }[];
    comprasFinalizadas: { fecha: string; estado: string }[];
  };
}

const MetricasVentas: React.FC<PropsMetricasVentas> = ({ data }) => {
  const { productosMasVendidos, comprasFinalizadas } = data;

  return (
    <div className="bg-light-blue rounded-lg shadow-md p-6 border border-gray-300 mx-auto w-96 shadow-black mt-10">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-800">Métricas de Ventas</h2>
      <div>
        <h3 className="font-semibold text-gray-600 mb-3">Productos Más Vendidos</h3>
        <ul className="space-y-3">
          {productosMasVendidos.map((producto, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg flex justify-between">
              <span>{producto.nombre}</span>
              <span className="font-bold">Cantidad: {producto.cantidad}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold text-gray-600 mb-3">Compras Finalizadas</h3>
        <ul className="space-y-3">
          {comprasFinalizadas.map((compra, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg flex justify-between">
              <span>{compra.fecha}</span>
              <span className="text-sm text-gray-500">{compra.estado}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MetricasVentas;
