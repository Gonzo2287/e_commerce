import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';


export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No estás autenticado' }, { status: 401 });
  }

  const { id } = params;

  if (session.user.id !== id) {
    return NextResponse.json({ error: 'No tienes permitido verificar esta cuenta' }, { status: 403 });
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: Number(id) },
    });

    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const usuarioActualizado = await prisma.usuario.update({
      where: { id_usuario: Number(id) },
      data: { cuentaVerificada: true },
    });

    return NextResponse.json({ message: 'Cuenta verificada con éxito', usuario: usuarioActualizado });
  } catch (error) {
    console.error('Error al verificar la cuenta:', error);
    return NextResponse.json({ error: 'Error en la verificación' }, { status: 500 });
  }
}
