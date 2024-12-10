import { NextResponse } from "next/server";
import { ComboData } from "../types/ComboData";
import { prisma } from "@/lib/prisma";

export async function obtenerCombos() {
    const combos = await prisma.combo.findMany({
        include: {
            productos: {
                include: {
                    producto: true
                }
            }
        }
    });
    return combos;
}

export async function crearCombo(data: ComboData) {
    const { nombre, descuento, productos, id_usuario } = data;

    try {
        const nuevoCombo = await prisma.combo.create({
            data: {
                nombre,
                descuento: descuento,
                id_usuario: id_usuario,
            },
        });

        for (const producto of productos) { 
            const productoId = producto.id_producto; 
            const productoData = await prisma.producto.findUnique({
                where: { id_producto: productoId },
            });

            if (!productoData || productoData.precio === null || productoData.precio === undefined) {
                console.error(`Producto con ID ${productoId} no encontrado o no tiene precio.`);
                continue;
            }

            const precioConDescuento = productoData.precio * (1 - nuevoCombo.descuento);
            await prisma.comboProducto.createMany({
                data: {
                    id_combo: nuevoCombo.id_combo,
                    id_producto: productoId,
                    precioDescuento: precioConDescuento,
                },
            });
        }

        return nuevoCombo;

    } catch (error) {
        console.error("Error al crear Combo:", error);
        return NextResponse.json({ error: "Error al crear Combo" }, { status: 500 });
    }
}

export async function eliminarCombo( id: number) {
    try {
        if (!id) throw new Error('ID de combo es necesario');
        await prisma.comboProducto.deleteMany({
            where: {
              id_combo: id,
            },
        });
        
        const deletedCombo = await prisma.combo.delete({
            where: {
              id_combo: id,
            },
        });
        
        return { status: 200, message: 'Combo eliminado correctamente' };

    } catch (error) {
        console.error("Error al obtener combo:", error);
        return NextResponse.json({ error: "Error al obtener combo" }, { status: 500 });
    }
}



export async function editarCombo(id: number, data: ComboData) {
    try {
        if (!id) throw new Error('ID de combo es necesario');


        const comboActual = await prisma.combo.findUnique({
            where: { id_combo: id },
            include: { productos: true },
        });

        if (!comboActual) throw new Error('Combo no encontrado');


        const productosAEliminar = comboActual.productos.filter(
            (producto) => !data.productos.some((p) => p.id_producto === producto.id_producto)
        );


        const productosAAgregar = data.productos.filter(
            (producto) => !comboActual.productos.some((p) => p.id_producto === producto.id_producto)
        );

        await prisma.comboProducto.deleteMany({
            where: {
                id_combo: id,
                id_producto: { in: productosAEliminar.map((p) => p.id_producto) },
            },
        });

        await prisma.comboProducto.createMany({
            data: productosAAgregar.map((prod) => ({
                id_combo: id,
                id_producto: prod.id_producto,
            })),
        });

        const updatedCombo = await prisma.combo.update({
            where: { id_combo: id },
            data: {
                nombre: data.nombre,
                descuento: data.descuento,
                id_usuario: data.id_usuario,
            },
        });

        return { status: 200, message: 'Combo editado correctamente', data: updatedCombo };
    } catch (error) {
        console.error("Error al editar combo:", error);
        return { status: 500, message: "Error al editar combo" };
    }
}