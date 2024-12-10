import { auth } from "@/auth"; 

export async function GET() {
  try {
    const session = await auth(); // Obtén los datos de autenticación
    return new Response(JSON.stringify(session?.user || null), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error obteniendo sesión" }), {
      status: 500,
    });
  }
}
