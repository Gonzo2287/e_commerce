import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const productos = await prisma.producto.findMany();
        return NextResponse.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const data = await request.json();
    console.log(data);
    // Validaciones básicas de los datos de entrada
    if (!data.nombre || !data.precio || !data.marca || !data.tipo) {
        return NextResponse.json({ error: "Datos incompletos para crear el producto" }, { status: 400 });
    }

    try {
        const nuevoProducto = await prisma.producto.create({
            data: {
                nombre: data.nombre,
                descripcion: data.descripcion,
                imagen: data.imagen, // Asegúrate de que sea una URL válida
                precio: data.precio,
                cantidad: data.cantidad,
                marca: data.marca,
                tipo: data.tipo,
            },
        });

        return NextResponse.json(nuevoProducto, { status: 201 });
    } catch (error) {
        return handleError(error, "Error al crear producto");
    }
}

function handleError(error: unknown, message: string) {
    console.error(message, error);
    return NextResponse.json({ error: message }, { status: 500 });
}
