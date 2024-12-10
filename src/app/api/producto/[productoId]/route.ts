import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { eliminarProducto } from "../../../../../utils/producto";

export async function GET(request : Request, {params} : {params : Params}) {

    try {
        const productoCreado = await prisma.producto.findUnique({
            where: {
                id_producto: Number(params.productoId),
            }
        });
    
        return NextResponse.json(productoCreado);
    }catch(error){
        return NextResponse.json({error}, {status: 404});
    }
}



export async function PUT(request : Request, {params} : {params : Params}) {
    try {
        const {nombre, descripcion, imagen, precio, cantidad} = await request.json();
        const productoActualizado = await prisma.producto.update({
            where: {
                id_producto: Number(params.productoId),
            },
            data: {
                nombre,
                descripcion,
                imagen,
                precio,
                cantidad
            }
        });
        return NextResponse.json(productoActualizado);
    }catch(error){
        return NextResponse.json({error}, {status: 404});
    }
}

// export async function DELETE(request : Request, {params} : {params : Params}) {
//     try {
//         const productoBorrado = await prisma.producto.delete({
//             where: {
//                 id_producto: Number(params.productoId),
//             }
//         });
        
//         return NextResponse.json(productoBorrado);
//     }catch(error) {
//         return NextResponse.json({error}, {status: 404});
//     }
// }

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    console.log("ID recibido en DELETE:", id);

    if (!id) {
        return NextResponse.json({ message: 'ID no proporcionado' }, { status: 400 });
    }

    try {
        await eliminarProducto(Number(id));
        return NextResponse.json({ message: 'Producto eliminado exitosamente' }, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar Producto:", error);
        return NextResponse.json({ message: 'Error al eliminar el Producto' }, { status: 500 });
    }
}