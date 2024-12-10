import DetallePedido from "@/app/success/DetallePedido";
import getSesionStripe from "../../../utils/stripe/getSesionStripe";
import Stripe from "stripe";
import { auth } from "@/auth";
import { descontarCantidadProductos } from "../../../utils/descontarCantidadProducto";




export default async function Page({ searchParams }: { searchParams: { session_id: string } }) {
  const session_id = searchParams.session_id;
  
  // Obtener los detalles de la sesión de Stripe
  const session: Stripe.Response<Stripe.Checkout.Session> | null = await getSesionStripe(session_id);

  if (!session || session.payment_status !== "paid") {
    return <div>Pago fallido o no completado.</div>;
  }

  // Obtener la sesión del usuario actual
  const usuarioSession = await auth();
  const usuarioId = usuarioSession?.user?.id;

  // Extraer datos de productos y construir el objeto de pedido
  const productos = session.line_items?.data.map(item => {
    const product = item.price?.product as Stripe.Product;
    return {
      nombre: product?.name || "Nombre no disponible",
      id_producto: parseInt(product?.metadata.id_producto || "0"), 
      cantidad: item.quantity || 0,
    };
  }) || [];

  const sessionStripe = {
    id: session.id,
    estadoCompra: session.status?.toString() || null,
    totalSession: session.amount_total,
    moneda: session.currency,
    estadoPago: session.payment_status.toString() || null,
    metodoPago: session.payment_method_types,
    productos,
  };

  // Llama a la API para crear el pedido en el servidor
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pedido`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_stripe: sessionStripe.id,
      id_usuario: parseInt(usuarioId || 'null'),  // Asigna el usuario correspondiente
      fecha: new Date(),
      metodo_pago: sessionStripe.metodoPago[0],
      estadoCompra: sessionStripe.estadoCompra,
      precio_final: (session.amount_total ?? 0) /100,
      recargos: 0,
      descuentos: 0,
      productos: sessionStripe.productos,
    }),
  });


  if (!response.ok) {
    console.error("Error al crear el pedido:", response.statusText);
    return <div>Error al crear el pedido</div>;
  }

  const nuevoPedido = await response.json();
  
  // Descontar la cantidad de los productos en el inventario
  try {
    await descontarCantidadProductos(sessionStripe.productos);
  } catch (error) {
    console.error("Error al descontar productos en inventario:", error);
  }

  return (
    <div>
      <DetallePedido 
        id={nuevoPedido.id_pedido}
        estadoCompra={sessionStripe.estadoCompra}
        totalSession={sessionStripe.totalSession}
        moneda={sessionStripe.moneda}
        estadoPago={sessionStripe.estadoPago}
        metodoPago={sessionStripe.metodoPago}
        productos={sessionStripe.productos} usuarioId={Number(usuarioId) || 0} puntosGanados={0} puntosTotales={0} 
      />       
    </div>
  );
}