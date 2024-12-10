import { prisma } from "@/lib/prisma";
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
});

export async function mailStockBajo() {
    const admin= await prisma.usuario.findMany({
        where: { role: 'admin' },
        select: { correo: true },
    });
    
    for (const correos of admin){
        await transporter.sendMail({
            from: '"E-commerce" <ecommerce.pasantia@gmail.com>',
            to: correos.correo,
            subject: 'Comprobante de Pago - E-commerce',
            text: `Gracias por tu compra. Te adjuntamos el comprobante de pago.`,
            html: `<p>Gracias por tu compra. Aquí tienes tu comprobante.</p>`,
            attachments: [
              {
                  filename: 'comprobante_pago.pdf',
                  content: '',
                  contentType: 'application/pdf',
                },
            ],
        })
    }

    console.log(admin)
    return(admin)
}
