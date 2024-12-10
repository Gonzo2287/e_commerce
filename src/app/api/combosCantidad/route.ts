import { NextResponse } from "next/server";
import { crearComboCantidad, obtenerCombosCantidad } from "../../../../utils/comboCantidad";

export async function GET() {
  try {
      const combosCantidad = await obtenerCombosCantidad();
      return NextResponse.json(combosCantidad);
  } catch (error) {
      return NextResponse.json({ error: "Error al obtener combos de cantidad" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
      const data = await request.json();
      const nuevoComboCantidad = await crearComboCantidad(data);
      return NextResponse.json(nuevoComboCantidad);
  } catch (error) {
      return NextResponse.json({ error: "Error al crear combo de cantidad" }, { status: 500 });
  }
}
