const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req : Request) {
  try {
    const {correo, userId}  = await req.json();

    await transporter.sendMail({
      from: '"Validacion de correo electrónico" <ecommerce.pasantia@gmail.com>',
      to: correo,
      subject: "Bienvenido",
      text: `Por favor, verifica tu cuenta haciendo clic en el siguiente enlace: http://localhost:3000/verificar/${userId}`,
      html: `
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Verificación de Cuenta</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333333;
              margin: 0;
              padding: 0;
            }

            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              font-size: 16px;
              color: white !important;
              background-color: #007bff;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #888888;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>¡Verifica tu cuenta!</h2>
            <p>
              Hola, gracias por registrarte en localhost:3000. Para completar el
              proceso, por favor verifica tu cuenta haciendo clic en el botón de
              abajo.
            </p>
            <a
              href="http://localhost:3000/verificar/${userId}"
              class="button"
              target="_blank"
              >Verificar Cuenta</a
            >
            <p>
              Si no solicitaste esta verificación, puedes ignorar este mensaje.
            </p>
            <div class="footer">
              <p>&copy; 2024 E-commerce. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
      </html>
      `,
    });

    return new Response(JSON.stringify({ message: 'Correo enviado con éxito.' }), { status: 200 });
} catch (error) {
  console.error('Error al enviar correo:', error);
  return new Response(JSON.stringify({ error: 'Error al enviar correo.' }), { status: 500 });
}
}