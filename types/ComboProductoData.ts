import { ProductoData } from "./ProductData";

export type ComboProductoData = {
    id_producto: number;
    producto: ProductoData;
    precioDescuento: number;
};