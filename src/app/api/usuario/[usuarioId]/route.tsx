import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Params }) {
  console.log("GET /api/usuario/[usuarioId]", params);
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id_usuario: Number(params.usuarioId),
      },
      select: {
        id_usuario: true,
        nombre: true,
        apellido: true,
        correo: true,
        telefono: true,
        direccion: true,
        localidad: true,
        puntos: true, // Incluimos solo los campos necesarios
      },
    });

    if (!usuario) {
      return NextResponse.json(
        { message: "Usuario no encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(usuario);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return NextResponse.json(
      { message: "Error al obtener el usuario.", error },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const { nombre, apellido, correo, telefono, direccion, localidad } =
      await request.json();

    const usuarioActualizado = await prisma.usuario.update({
      where: {
        id_usuario: Number(params.usuarioId),
      },
      data: {
        nombre,
        apellido,
        correo,
        telefono,
        direccion,
        localidad,
      },
      select: {
        id_usuario: true,
        nombre: true,
        apellido: true,
        correo: true,
        telefono: true,
        direccion: true,
        localidad: true,
        puntos: true, // Retornamos también los puntos actualizados
      },
    });

    return NextResponse.json(usuarioActualizado);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return NextResponse.json(
      { message: "Error al actualizar el usuario.", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const usuarioBorrado = await prisma.usuario.delete({
      where: {
        id_usuario: Number(params.usuarioId),
      },
      select: {
        id_usuario: true,
        nombre: true,
        correo: true,
        puntos: true, // Incluye los puntos del usuario eliminado para registro
      },
    });

    return NextResponse.json(usuarioBorrado);
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return NextResponse.json(
      { message: "Error al eliminar el usuario.", error },
      { status: 500 }
    );
  }
}
