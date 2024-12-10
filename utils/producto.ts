import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ProductoData } from "../types/ProductData";


export async function obtenerProductos() {
    const productos = await prisma.producto.findMany();
    return productos;
}

export async function crearProducto(data: ProductoData) {
    const { nombre, descripcion, imagen, precio, cantidad, marca, tipo } = data;

    try {
        const nuevoProducto = await prisma.producto.create({
            data: {
                nombre: data.nombre,
                descripcion: data.descripcion,
                imagen: data.imagen,
                precio: data.precio,
                cantidad: data.cantidad,
                marca: data.marca,
                tipo: data.tipo
            },
        });

        return nuevoProducto;

    } catch (error) {
        console.error("Error al crear Producto:", error);
        return NextResponse.json({ error: "Error al crear Producto" }, { status: 500 });
    }
}

export async function editarProducto(id: number, data: ProductoData) {
    try {
        if (!id) throw new Error('ID de combo es necesario');


        const productoActual = await prisma.producto.findUnique({
            where: { id_producto: id },
        });

        if (!productoActual) throw new Error('Producto no encontrado');

        await prisma.producto.deleteMany({
            where: {
                id_producto: id,
            },
        });

        const updatedProducto = await prisma.producto.update({
            where: { id_producto: id },
            data: {
                nombre: data.nombre,
                descripcion: data.descripcion,
                imagen:data.imagen,
                precio: data.precio,
                cantidad: data.cantidad,
                marca: data.marca,
                tipo: data.tipo
            },
        });

        return { status: 200, message: 'Producto editado correctamente', data: updatedProducto };
    } catch (error) {
        console.error("Error al editar producto:", error);
        return { status: 500, message: "Error al editar Producto" };
    }
}

export async function eliminarProducto( id: number) {
    try {
        if (!id) throw new Error('ID de producto es necesario');
        await prisma.producto.deleteMany({
            where: {
              id_producto: id,
            },
        });
        
        const deletedProducto = await prisma.producto.delete({
            where: {
              id_producto: id,
            },
        });
        
        return { status: 200, message: 'Producto eliminado correctamente' };

    } catch (error) {
        console.error("Error al obtener producto:", error);
        return NextResponse.json({ error: "Error al obtener producto" }, { status: 500 });
    }
}