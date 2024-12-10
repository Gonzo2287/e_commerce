import { NextResponse } from "next/server";
import { enviarComprobante } from "../../../../utils/enviarComprobante";

export async function POST(req: Request) {
    try {
        const { id_pago, detallesPedido } = await req.json();
        
        await enviarComprobante({ id_pago,detallesPedido });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error en enviarComprobante:", error);
        return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
    }
}