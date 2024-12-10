import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";


export async function POST(request: Request) {

  try {
    const data = await request.json();

    const usuarioEncontrado = await prisma.usuario.findUnique({
      where: {
        correo: data.correo,
      },
    });

    if (usuarioEncontrado) {
      alert("El usuario ya existe");

      return NextResponse.json(
        {
          message: "El email ya existe",
        },
        {
          status: 400,
        }
      );
    }

    // Encriptado de clave antes de crear el usuario
    const hashClave = await bcrypt.hash(data.clave, 10);
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        clave: hashClave,
        telefono: data.telefono,
        direccion: data.direccion,
        localidad: data.localidad,
        role: data.role
      },
    });

    // Muestra un usuario sin el campo clave
    const usuario = { 
      nombre: nuevoUsuario.nombre, 
      apellido: nuevoUsuario.apellido,
      correo: nuevoUsuario.correo 
    };
    return NextResponse.json(usuario);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error); // Log del error completo
      return NextResponse.json(
        { message: error.message }, 
        { status: 500 }
      );
    }
    console.log("error",error)
    return NextResponse.json({
      message: (error as Error).message,
    }, {
        status: 500
    });
  }
}
