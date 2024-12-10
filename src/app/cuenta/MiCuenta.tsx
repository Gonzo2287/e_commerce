"use client";

import { auth } from "@/auth";
import { useEffect, useState } from "react";

type Usuario = {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  direccion: string;
  localidad: string;
  fecha_registro: string;
  puntos: number;
};

function MiCuenta({ session }: { session: any }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
  const [claveActual, setClaveActual] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [status, setStatus] = useState("loading"); // Add status state


  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const usuarioId = session?.user?.id;
        
        if (!usuarioId) {
          setStatus("unauthenticated");
          return;
        }

        const response = await fetch(`/api/usuario/${usuarioId}`);
        if (!response.ok) throw new Error("Error al obtener datos del usuario");
        const data = await response.json();
        setUsuario(data);
        setStatus("authenticated");
      } catch (err) {
        console.error(err);
        setError("Error al cargar la información del usuario");
        setStatus("error");
      }
    };

    fetchUsuario();
  }, [session]);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const usuarioId = session?.user?.id;
      const response = await fetch(`/api/usuario/${usuarioId}/cambiarPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claveActual, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error al actualizar la contraseña.");
      } else {
        setSuccess("Contraseña actualizada correctamente.");
        setChangePasswordOpen(false);
      }
    } catch (err) {
      setError("Ocurrió un error al procesar la solicitud.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <p className="text-center text-gray-500">Cargando...</p>;
  }

  if (status === "unauthenticated" || !usuario) {
    return <p className="text-center text-gray-500">No se encontró información del usuario.</p>;
  }

  return(
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Mi Cuenta</h2>
      <div className="border-t border-gray-200 mt-4 pt-4">
        <h3 className="text-lg font-semibold text-gray-600">Información de Perfil</h3>
        <p className="text-gray-700 mt-2">
          <span className="font-medium">Nombre:</span> {usuario.nombre} {usuario.apellido}
        </p>
        <p className="text-gray-700 mt-2">
          <span className="font-medium">Correo Electrónico:</span> {usuario.correo}
        </p>
        <p className="text-gray-700 mt-2">
          <span className="font-medium">Teléfono:</span> {usuario.telefono}
        </p>
        <p className="text-gray-700 mt-2">
          <span className="font-medium">Dirección:</span> {usuario.direccion}, {usuario.localidad}
        </p>
        <p className="text-gray-700 mt-2">
          <span className="font-medium">Puntos Acumulados:</span> {usuario.puntos}
        </p>
      </div>

      <div className="border-t border-gray-200 mt-6 pt-4">
        <h3 className="text-lg font-semibold text-gray-600">Configuración de Cuenta</h3>
        <button
          onClick={() => setChangePasswordOpen(true)}
          className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
        >
          Cambiar Contraseña
        </button>
      </div>

      {isChangePasswordOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Cambiar Contraseña</h3>
            {error && <p className="text-red-500 mb-3">{error}</p>}
            {success && <p className="text-green-500 mb-3">{success}</p>}
            <input
              type="password"
              placeholder="Contraseña Actual"
              className="w-full border p-2 rounded mb-3"
              value={claveActual}
              onChange={(e) => setClaveActual(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nueva Contraseña"
              className="w-full border p-2 rounded mb-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmar Nueva Contraseña"
              className="w-full border p-2 rounded mb-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={handleChangePassword}
              disabled={loading}
              className={`bg-blue-500 text-white py-2 px-4 rounded w-full mb-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Actualizando..." : "Actualizar Contraseña"}
            </button>
            <button
              onClick={() => setChangePasswordOpen(false)}
              className="bg-red-500 text-white py-2 px-4 rounded w-full"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MiCuenta;

