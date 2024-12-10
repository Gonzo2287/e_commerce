import { ComboProductoData } from "./ComboProductoData";

export type ComboData = {
    id_combo: number;
    nombre: string;
    descuento: number;
    id_usuario: number;
    productos: ComboProductoData[];
  };