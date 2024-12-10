import { generarComprobantePDF } from "./generarPdf";
const nodemailer = require("nodemailer");
import { auth } from "@/auth";

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function enviarComprobante(data: any) {
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
      throw new Error("No se pudo obtener el correo del usuario: usuario no autenticado.");
    }
    const usuario = session.user;

    const pdf = await generarComprobantePDF(usuario, data.detallesPedido);
    
    await transporter.sendMail({
      from: '"E-commerce" <ecommerce.pasantia@gmail.com>',
      to: usuario.email,
      subject: 'Comprobante de Pago - E-commerce',
      text: `Gracias por tu compra. Te adjuntamos el comprobante de pago.`,
      html: `<p>Gracias por tu compra. Aquí tienes tu comprobante.</p>`,
      attachments: [
        {
          filename: 'comprobante_pago.pdf',
          content: pdf,
          contentType: 'application/pdf',
        },
      ],
    });

  } catch (error) {
    console.error('Error al generar el PDF o enviar el correo:', error);
  }
}
