import { ComboData } from "./ComboData"
import { ProductoData } from "./ProductData"

export type CarritoData = {
    // Colocamos estos campos como opcionales con '?' para que no sea necesario que estén completos
    // y así identificar si se trata de un combo o un producto
    producto?: ProductoData, 
    combo?: ComboData,
    // La cantidad la dejamos para que nos permita elegir la cantidad del producto o combo que seleccionemos
    cantidad: number,
}
  