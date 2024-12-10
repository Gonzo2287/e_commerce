// MetricasProductos.tsx
import React from 'react';

export interface PropsMetricasProductos {
  data: {
    totalProductos: number;
    totalIngresos: number;
    valorPromedioProducto: number;
  };
}

export const MetricasProductos: React.FC<PropsMetricasProductos> = ({ data }) => {
  return (
    <div className="bg-light-blue rounded-lg shadow-md p-6 border border-gray-300 mx-auto w-96 shadow-black mt-10">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-800">Métricas de Productos</h2>
      <ul className="space-y-4">
        <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <span className="font-semibold text-gray-600">Total Productos:</span>
          <span>{data.totalProductos}</span>
        </li>
        <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <span className="font-semibold text-gray-600">Total Ingresos:</span>
          <span>{data.totalIngresos}</span>
        </li>
        <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <span className="font-semibold text-gray-600">Valor Promedio:</span>
          <span>{data.valorPromedioProducto.toFixed(2)}</span>
        </li>
      </ul>
    </div>
  );
};

export default MetricasProductos;
