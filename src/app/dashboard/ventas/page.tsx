import MetricasVentas from './MetricasVentas';
import { prisma } from '@/lib/prisma';

async function obtenerDatos() {
  const productosMasVendidos = await prisma.producto.findMany({
    where: {
      cantidad: { gt: 0 },
    },
    orderBy: {
      cantidad: 'desc',
    },
    take: 5,
  }).then(productos =>
    productos.map(producto => ({
      nombre: producto.nombre,
      cantidad: producto.cantidad,
    }))
  );

  const comprasFinalizadas = await prisma.pedido.findMany({
    where: {
      estadoCompra: 'finalizado',
    },
    orderBy: {
      fecha: 'desc',
    },
    take: 5,
  }).then(compras =>
    compras.map(compra => ({
      fecha: compra.fecha.toISOString(), // Convertir Date a string
      estado: compra.estadoCompra,
    }))
  );

  return {
    productosMasVendidos,
    comprasFinalizadas,
  };
}


export default async function MetricasPage() {
  const data = await obtenerDatos();
  

  return (
    
     <div className="h-96"> 
      <MetricasVentas  data={data}/>
    </div>
  );
 
}