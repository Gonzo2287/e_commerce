// import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { mailStockBajo } from "../../../../utils/mailStockBajo";

export async function GET() {
    try {
      const admins = await mailStockBajo()

    //   res.status(200).json({ success: true, admins });
      return NextResponse.json(admins);
    } catch (error) {
      console.error("Error al obtener administradores:", error);
      return NextResponse.json({ error: "Error al obtener administradores: linea 13" }, { status: 500 });
    }
}
