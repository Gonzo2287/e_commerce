
export const calculateDiscount = (points: number, price: number): number => {
    const discountRate = 1.5; // 1% por punto
    const discount = points * discountRate;

    return Math.min(discount, price); // El descuento no puede superar el precio
};
  
  export function canApplyDiscount(total: number, discount: number): boolean {
    return discount > 0 && discount <= total;
  }

  export interface PointsDiscountUtils {
    calculateDiscount: (points: number) => number;
    canApplyDiscount: (total: number, discount: number) => boolean;
  }
