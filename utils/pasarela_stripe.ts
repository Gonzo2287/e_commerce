import { ProductoData } from "../types/ProductData";
import Stripe from 'stripe'
import axios from 'axios';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function crearSesionStripe(cartItems: ProductoData[], totalAfterDiscount: number) {
    try {
        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: 'ars',
                product_data: {
                    name: item.nombre,
                    metadata: {
                        id_producto: item.id_producto,
                    },
                },
                unit_amount: (totalAfterDiscount*100)/item.cantidad, // Usa el total después del descuento
            },
            quantity: item.cantidad,
        }));
        
        const session = await stripe.checkout.sessions.create({
            success_url: `/success?session_id={CHECKOUT_SESSION_ID}`,
            line_items: lineItems,
            mode: 'payment'
        });
        
        const compraData = {
            id_pago: session.id,
            detallesPedido: {
                productos: cartItems.map(item => ({
                    nombre: item.nombre,
                    cantidad: item.cantidad,
                    precio: item.precio,
                })),
                total: session.amount_total,
            },
        };

        // Aquí se envía el comprobante al correo del usuario.
        const response = await axios.post('/api/enviarComprobante', { 
            id_pago: compraData.id_pago, 
            detallesPedido: compraData.detallesPedido 
        });

        if (response.status === 200) {
            console.log("Comprobante enviado exitosamente.");
        } else {
            console.error("Error al enviar el comprobante:", response.data);
        }
        
        return session.url;

    } catch (error) {
        console.error("Error al crear la sesión de Stripe:", error);
        throw new Error("No se pudo crear la sesión de pago");
    }
}
