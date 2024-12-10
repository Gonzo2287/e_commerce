import React, { useState } from "react";

const CambiarContrasena = () => {
  const [claveActual, setClaveActual] = useState("");
  const [nuevaClave, setNuevaClave] = useState("");
  const [confirmarClave, setConfirmarClave] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (nuevaClave !== confirmarClave) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: "usuario@ejemplo.com", // Ajusta esto según el contexto
          claveActual,
          nuevaClave,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(data.message);
      } else {
        setError(data.message || "Error al actualizar la contraseña.");
      }
    } catch (error) {
      setError("Ocurrió un error al procesar la solicitud.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="claveActual">Contraseña Actual</label>
        <input
          type="password"
          id="claveActual"
          value={claveActual}
          onChange={(e) => setClaveActual(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="nuevaClave">Nueva Contraseña</label>
        <input
          type="password"
          id="nuevaClave"
          value={nuevaClave}
          onChange={(e) => setNuevaClave(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="confirmarClave">Confirmar Nueva Contraseña</label>
        <input
          type="password"
          id="confirmarClave"
          value={confirmarClave}
          onChange={(e) => setConfirmarClave(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Cambiando..." : "Cambiar Contraseña"}
      </button>
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default CambiarContrasena;
