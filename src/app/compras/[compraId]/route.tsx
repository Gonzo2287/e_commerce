import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { actualizarPuntosUsuario } from "../compraService"; // Importa la función de puntos

export async function POST(request: Request) {
  try {
    const { usuarioId, totalCompra } = await request.json();

    // Calcula los puntos ganados
    const puntosGanados = calcularPuntos(totalCompra);

    // Crea el nuevo pedido
    const nuevoPedido = await prisma.pedido.create({
      data: {
        id_usuario: usuarioId,
        precio_final: totalCompra,
        metodo_pago: "tarjeta",   // Asegúrate de incluir todos los campos obligatorios
        estadoCompra: "pendiente",
        estadoPedido: "RECIBIDO",
        recargos: 0,
        descuentos: 0,
        fecha: new Date(),
        puntosGanados: puntosGanados,
      },
    });

    // Actualiza los puntos acumulados del usuario
    const usuarioActualizado = await actualizarPuntosUsuario(usuarioId, puntosGanados);

    return NextResponse.json({
      mensaje: "Compra completada",
      usuario: usuarioActualizado,
      pedido: nuevoPedido,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al procesar la compra" }, { status: 500 });
  }
}

function calcularPuntos(totalCompra: number): number {
  // Lógica para calcular los puntos ganados
  return Math.floor(totalCompra / 100); // Por ejemplo: 1 punto por cada 100 unidades gastadas
}
