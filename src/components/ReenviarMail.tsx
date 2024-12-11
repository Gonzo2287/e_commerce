"use client";

const ReenviarMail = ({ correo, userId }: { correo: string; userId: string }) => {
  const handleClick = async () => {
    try {
      const correoRes = await fetch("/api/enviarMail", {
        method: "POST",
        body: JSON.stringify({ correo, userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (correoRes.ok) {
        console.log("Correo de verificación reenviado con éxito");
      } else {
        console.error("Error al reenviar el correo de verificación");
      }
    } catch (error) {
      console.error("Error al intentar enviar el correo:", error);
    }
  };

  return (
    <button onClick={handleClick} className="underline font-bold">
      Haz clic aquí para reenviar el mail de verificación.
    </button>
  );
};

export default ReenviarMail;
