import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Obtener el estado del pedido y puntos asociados
export async function GET(request: Request, { params }: { params: Params }) {
  const pedidoId = Number(params.pedidoId); // Convertir a número, asumiendo que id_pedido es un entero

  if (isNaN(pedidoId)) {
    return NextResponse.json({ error: "ID de pedido inválido" }, { status: 400 });
  }

  try {
    const pedidoCreado = await prisma.pedido.findUnique({
      where: { id_pedido: pedidoId },
      include: {
        usuario: {
          select: {
            puntos: true, // Puntos totales acumulados del usuario
          },
        },
      },
    });

    // Verificar si el pedido existe
    if (!pedidoCreado) {
      return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
    }

    // Calcular los puntos ganados en esta compra
    const puntosGanados = Math.floor(pedidoCreado.precio_final / 100); // Ajusta el cálculo según sea necesario
    const puntosTotales = pedidoCreado.usuario.puntos;

    // Responder con el estado del pedido, puntos ganados y puntos totales
    return NextResponse.json({
      estado: pedidoCreado.estadoPedido,
      puntosGanados,
      puntosTotales,
    });
  } catch (error) {
    console.error("Error al obtener el pedido:", error);
    return NextResponse.json({ error: "Error al obtener el pedido" }, { status: 500 });
  }
}

// Eliminar un pedido
export async function DELETE(request: Request, { params }: { params: Params }) {
  const pedidoId = Number(params.pedidoId);

  if (isNaN(pedidoId)) {
    return NextResponse.json({ error: "ID de pedido inválido" }, { status: 400 });
  }

  try {
    const pedidoBorrado = await prisma.pedido.delete({
      where: { id_pedido: pedidoId },
    });

    return NextResponse.json(pedidoBorrado);
  } catch (error) {
    console.error("Error al eliminar el pedido:", error);
    return NextResponse.json({ error: "Error al eliminar el pedido" }, { status: 404 });
  }
}
