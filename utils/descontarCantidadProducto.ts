import { prisma } from "@/lib/prisma";

interface Producto {
  id_producto: number;
  cantidad: number;
}

export async function descontarCantidadProductos(productos: Producto[]) {
  try {
    for (const producto of productos) {
      
      const productoActual = await prisma.producto.findUnique({
        where: { id_producto: producto.id_producto },
        select: { cantidad: true },
      });

      
      if (productoActual && productoActual.cantidad !== null && productoActual.cantidad >= producto.cantidad) {
        await prisma.producto.update({
          where: { id_producto: producto.id_producto },
          data: {
            cantidad: {
              decrement: producto.cantidad,
            },
          },
        });
      } else {
        console.warn(`La cantidad del producto con ID ${producto.id_producto} no es suficiente para el descuento.`);
      }
    }
    console.log("Descuento de productos realizado exitosamente");
  } catch (error) {
    console.error("Error al descontar cantidad de productos:", error);
    throw new Error("Error al descontar cantidad de productos");
  }
}
