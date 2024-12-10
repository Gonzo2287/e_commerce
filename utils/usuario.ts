import { NextResponse } from "next/server";
import { UsuarioData } from "../types/UsuarioData";
import { prisma } from "@/lib/prisma";

export async function getAllUsers() {
    try {
        return await prisma.usuario.findMany();
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 });
    }
}

export async function getUsuarioById( id: number) {
    try {
        return await prisma.usuario.findUnique({
            where: { id_usuario: id }
        });
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return NextResponse.json({ error: "Error al obtener usuario" }, { status: 500 });
    }
}

export async function getUsuarioByEmail( email : string) {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {
                correo: email, 
            }
        });

        return usuario;

    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return NextResponse.json({ error: "Error al obtener usuario" }, { status: 500 });
    }
}

export async function updateUsuario( data: UsuarioData) {
    try {
        return await prisma.usuario.update({
            where: { id_usuario: data.id_usuario},
            data
        });
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return NextResponse.json({ error: "Error al actualizar el usuario" }, { status: 500 });
    }
}

export async function deleteUsuario( id: number) {
    try {
        return await prisma.usuario.delete({
            where: { id_usuario: id }
        });
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return NextResponse.json({ error: "Error al obtener usuario" }, { status: 500 });
    }
}

// Maneja la solicitud POST para crear un nuevo usuario
export async function createUsuario(data: UsuarioData) {
    try {    
        return await prisma.usuario.create({data});
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return NextResponse.json({ error: "Error al crear usuario" }, { status: 500 });
    }
}
