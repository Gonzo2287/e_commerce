import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { correo, claveActual, nuevaClave } = data;

    // Buscar el usuario en la base de datos
    const usuario = await prisma.usuario.findUnique({
      where: { correo },
    });

    if (!usuario) {
      return NextResponse.json(
        { message: "Usuario no encontrado." },
        { status: 404 }
      );
    }

    // Verificar la contraseña actual
    const claveValida = await bcrypt.compare(claveActual, usuario.clave ?? '');
    if (usuario.clave === null) {

        return NextResponse.json(
            { message: "Invalid password." },
            { status: 400 }
        );
    }

    // Cifrar la nueva contraseña
    const hashNuevaClave = await bcrypt.hash(nuevaClave, 10);

    // Actualizar la contraseña en la base de datos
    await prisma.usuario.update({
      where: { correo },
      data: { clave: hashNuevaClave },
    });

    return NextResponse.json({
      message: "Contraseña actualizada exitosamente.",
    });
  } catch (error) {
    console.error("Error al actualizar contraseña:", error);
    return NextResponse.json(
      { message: "Ocurrió un error al actualizar la contraseña." },
      { status: 500 }
    );
  }
}


