const { PDFDocument } = require("pdf-lib");

export async function generarComprobantePDF(usuario: any, detalles: any) {
  console.log("Contenido de detallesPedido en generarComprobantePDF:", JSON.stringify(detalles, null, 2));

  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([600, 800]);

  const fechaActual = new Date();
  const fechaFormateada = fechaActual.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const totalFormateado = `$${(detalles.total / 100).toFixed(2)}`;

  // Título
  page.moveTo(50, 750);
  page.drawText("Comprobante de Pago", { size: 20, font: pdfDoc.embedStandardFont('Helvetica-Bold') });

  // Línea divisoria
  page.drawLine({
    start: { x: 50, y: 740 },
    end: { x: 550, y: 740 },
    thickness: 1,
  });

  // Fecha
  page.moveTo(50, 710);
  page.drawText(`Fecha: ${fechaFormateada}`, { size: 12 });

  // Línea divisoria
  page.drawLine({
    start: { x: 50, y: 700 },
    end: { x: 550, y: 700 },
    thickness: 1,
  });

  // Total destacado
  page.moveTo(50, 660);
  page.drawText(totalFormateado, { size: 28, font: pdfDoc.embedStandardFont('Helvetica-Bold') });

  // Detalles de vendedor y comprador
  page.moveTo(50, 635);
  page.drawText("Motivo: Compra Electrónica", { size: 12 });

  page.drawLine({
    start: { x: 50, y: 620 },
    end: { x: 550, y: 620 },
    thickness: 1,
  });

  page.moveTo(50, 610);
  page.drawText("De:", { size: 12});
  page.moveTo(80, 610);
  page.drawText("E-commerce.com", { size: 12, font: pdfDoc.embedStandardFont('Helvetica-Bold') });

  page.moveTo(50, 590);
  page.drawText("Para:", { size: 12});
  page.moveTo(80, 590);
  page.drawText(usuario.name, { size: 12, font: pdfDoc.embedStandardFont('Helvetica-Bold') });

  page.moveTo(50, 570);
  page.drawText(`Correo: ${usuario.email}`, { size: 12 });

  page.drawLine({
    start: { x: 50, y: 555 },
    end: { x: 550, y: 555 },
    thickness: 1,
  });

  // Título para productos
  page.moveTo(50, 540);
  page.drawText("Productos:", { size: 16, font: pdfDoc.embedStandardFont('Helvetica-Bold') });

  // Listado de productos
  let posicionY = 520;

  detalles.productos.forEach((producto: any) => {
    const precioTotal = producto.cantidad * producto.precio;

    // Nueva página si es necesario
    if (posicionY < 100) {
      page = pdfDoc.addPage([600, 800]);
      posicionY = 750;
    }

    page.moveTo(80, posicionY);
    page.drawText(`- ${producto.nombre}`, { size: 12 });
    page.moveTo(300, posicionY);
    page.drawText(`Cantidad: ${producto.cantidad}`, { size: 12 });
    page.moveTo(440, posicionY);
    page.drawText(`$${precioTotal.toFixed(2)}`, { size: 12 });

    posicionY -= 20;
  });

  // Línea divisoria antes del total
  page.drawLine({
    start: { x: 50, y: posicionY - 10 },
    end: { x: 550, y: posicionY - 10 },
    thickness: 1,
  });

  // Total final
  page.moveTo(400, posicionY - 30);
  page.drawText("Total", { size: 12, font: pdfDoc.embedStandardFont('Helvetica-Bold') });
  page.moveTo(440, posicionY - 30);
  page.drawText(totalFormateado, { size: 12, font: pdfDoc.embedStandardFont('Helvetica-Bold') });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
