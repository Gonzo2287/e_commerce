import { NextResponse } from 'next/server';
import { editarComboCantidad, eliminarComboCantidad } from '../../../../../utils/comboCantidad';

// Maneja la solicitud DELETE
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    console.log("ID recibido en DELETE:", id);

    if (!id) {
        return NextResponse.json({ message: 'ID no proporcionado' }, { status: 400 });
    }

    try {
        await eliminarComboCantidad(Number(id));
        return NextResponse.json({ message: 'ComboCantidad eliminado exitosamente' }, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar ComboCantidad:", error);
        return NextResponse.json({ message: 'Error al eliminar el ComboCantidad' }, { status: 500 });
    }
}

// Maneja la solicitud PUT
export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    console.log("ID recibido en UPDATE:", id);

    try {
        const data = await request.json();
        console.log("Datos EDICIÓN PUT", data);

        // Llama a la función de edición con los datos recibidos
        await editarComboCantidad(Number(id), data);
        return NextResponse.json({ message: 'ComboCantidad editado exitosamente' }, { status: 200 });
    } catch (error) {
        console.error("Error al editar ComboCantidad:", error);
        return NextResponse.json({ message: 'Error al editar el ComboCantidad' }, { status: 500 });
    }
}
