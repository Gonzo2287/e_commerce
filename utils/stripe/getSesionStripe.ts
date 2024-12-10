import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export default async function getSesionStripe(session_id: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "line_items.data.price.product"],
    });

    if (session.line_items && session.line_items.data) {
      // Mapeamos los productos extraídos de la sesión
      const productos = session.line_items.data.map(item => {
        // Aseguramos que item.price.product sea de tipo Stripe.Product
        const producto = item.price?.product as Stripe.Product;
        return {
          nombre: producto.name,
          id_producto: producto.metadata.id_producto, // Extraer id_producto de los metadatos
          cantidad: item.quantity, // Obtener cantidad directamente de quantity
        };
      });

      
    }

    return session;
  } catch (error) {
    console.error("Error al obtener la sesión de Stripe:", error);
    return null;
  }
}