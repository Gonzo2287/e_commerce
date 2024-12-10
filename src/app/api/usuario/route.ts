import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server"

export async function GET() {

    const usuario = await prisma.usuario.findMany()
    
    return NextResponse.json(usuario);
}

export async function POST(request : Request) {
    const {nombre, apellido, correo, clave, telefono, direccion, localidad} = await request.json();
    const guardarUsuario = await prisma.usuario.create({
        data: {
            nombre,
            apellido,
            correo,
            clave,
            telefono,
            direccion,
            localidad,
            // cuentaVerificada : false
        }
    });
    console.log(guardarUsuario);
    return NextResponse.json(guardarUsuario);
}