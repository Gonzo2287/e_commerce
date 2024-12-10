export type SessionStripe = {
    id: string | null;
    estadoCompra: string | null;
    totalSession: number | null;
    moneda: string | null;
    estadoPago: string | null;
    metodoPago: string[];
    productos: { nombre: string, id_producto: number; cantidad: number }[]; // Ajuste para recibir productos
    usuarioId: number;
    puntosGanados: number; // Nuevo campo para puntos ganados
    puntosTotales: number; // Nuevo campo para puntos totales
  }