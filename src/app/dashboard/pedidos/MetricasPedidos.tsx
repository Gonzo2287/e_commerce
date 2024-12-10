import React from 'react';

interface PropsMetricasPedidos {
  data?: {
    totalPedidos: number;
    totalIngresos: number;
    valorPromedioPedido: number;
  };
}

const MetricasPedidos: React.FC<PropsMetricasPedidos> = ({ data }) => {
  return (
    <div className="bg-light-blue rounded-lg shadow-md p-6 border border-gray-300 mx-auto w-96 shadow-black mt-10">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-800">Métricas de Pedidos</h2>
      <ul className="space-y-4">
        <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <span className="font-semibold text-gray-600">Total Pedidos:</span>
          <span>{data?.totalPedidos}</span>
        </li>
        <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <span className="font-semibold text-gray-600">Total Ingresos:</span>
          <span>{data?.totalIngresos}</span>
        </li>
        <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <span className="font-semibold text-gray-600">Valor Promedio:</span>
          <span>{data?.valorPromedioPedido}</span>
        </li>
      </ul>
    </div>
  );
};

export default MetricasPedidos;
