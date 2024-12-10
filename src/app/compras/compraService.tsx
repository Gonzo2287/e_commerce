// src/app/api/compras/compraService.ts

import { prisma } from "@/lib/prisma";

export const actualizarPuntosUsuario = async (usuarioId: number, puntosGanados: number) => {
  try {
    // Sumar los puntos ganados a los puntos totales del usuario
    const usuarioActualizado = await prisma.usuario.update({
      where: { id_usuario: usuarioId },
      data: {
        puntos: { increment: puntosGanados },  // Acumula los puntos
      },
    });

    return usuarioActualizado;
  } catch (error) {
    console.error("Error actualizando los puntos:", error);
    throw new Error("No se pudieron actualizar los puntos.");
  }
};
