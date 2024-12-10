import { NextResponse } from "next/server";
import { ComboCantidadData } from "../types/ComboCantidadData";
import { prisma } from "@/lib/prisma";

// Obtener todos los combos de cantidad
export async function obtenerCombosCantidad() {
    try {
        const combosCantidad = await prisma.comboCantidad.findMany({
            include: {
                producto: true
            }
        });
        return combosCantidad;
    } catch (error) {
        console.error("Error al obtener combos de cantidad:", error);
        return NextResponse.json({ error: "Error al obtener combos de cantidad" }, { status: 500 });
    }
}

// Crear un nuevo combo de cantidad
export async function crearComboCantidad(data: ComboCantidadData) {
    const { id_producto, cantidad_minima, descuento } = data;

    try {
        const nuevoComboCantidad = await prisma.comboCantidad.create({
            data: {
                id_producto,
                cantidad_minima: cantidad_minima,
                descuento,
            },
        });

        return { status: 200, message: "Combo de cantidad creado correctamente", data: nuevoComboCantidad };

    } catch (error) {
        console.error("Error al crear combo de cantidad:", error);
        return NextResponse.json({ error: "Error al crear combo de cantidad" }, { status: 500 });
    }
}

// Editar un combo de cantidad existente
export async function editarComboCantidad(id_comboCantidad: number, data: ComboCantidadData) {
    try {
        const comboCantidadActual = await prisma.comboCantidad.findUnique({
            where: { id_comboCantidad: id_comboCantidad },
        });

        if (!comboCantidadActual) throw new Error("Combo de cantidad no encontrado");

        const comboCantidadActualizado = await prisma.comboCantidad.update({
            where: { id_comboCantidad: id_comboCantidad },
            data: {
                id_producto: data.id_producto,
                cantidad_minima: data.cantidad_minima,
                descuento: data.descuento,
            },
        });

        return { status: 200, message: "Combo de cantidad editado correctamente", data: comboCantidadActualizado };
    } catch (error) {
        console.error("Error al editar combo de cantidad:", error);
        return { status: 500, message: "Error al editar combo de cantidad" };
    }
}

// Eliminar un combo de cantidad
export async function eliminarComboCantidad(id_comboCantidad: number) {
    try {
        if (!id_comboCantidad) throw new Error("ID de combo de cantidad es necesario");

        await prisma.comboCantidad.delete({
            where: { id_comboCantidad: id_comboCantidad },
        });

        return { status: 200, message: "Combo de cantidad eliminado correctamente" };
    } catch (error) {
        console.error("Error al eliminar combo de cantidad:", error);
        return { status: 500, message: "Error al eliminar combo de cantidad" };
    }
}
