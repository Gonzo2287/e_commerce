import { NextResponse } from "next/server";
import { crearCombo, obtenerCombos } from "../../../../utils/combos";

export async function GET() {
  try {
      const combos = await obtenerCombos();
      return NextResponse.json(combos);
  } catch (error) {
      return NextResponse.json({ error: "Error al obtener combos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
      const data = await request.json();
      const nuevoCombo = await crearCombo(data);
      return NextResponse.json(nuevoCombo);
  } catch (error) {
      return NextResponse.json({ error: "Error al crear combo" }, { status: 500 });
  }
}