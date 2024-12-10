import React from 'react';
import { Carrito } from '@/components/Carrito';
import { useSession } from "next-auth/react";
import { calculateDiscount, canApplyDiscount, } from '../../../utils/pointsDiscount';

const Page = () => {
  const removeFromCart = () => {};
  const { data: session } = useSession();
  const userPoints = session?.user?.puntos || 0;
  
  
  // Implement cart total calculation
  const cartTotal = 100; // Placeholder
  const pointDiscount = calculateDiscount(userPoints, cartTotal);
  const canApplyPointDiscount = canApplyDiscount(cartTotal, pointDiscount);

  const handleApplyPointDiscount = () => {
    if (canApplyPointDiscount) {
      // TODO: Implement point discount application logic
      console.log(`Applying discount of $${pointDiscount}`);
    }
  };
  
  return (
      <div>
          <h1 className='text-black'>Carrito de compra</h1>
          <Carrito/>
          <p>Tus puntos: {userPoints}</p>
          <p>Descuento disponible: ${pointDiscount}</p>
          {canApplyPointDiscount && (
            <button onClick={handleApplyPointDiscount}>
              Aplicar descuento de puntos
            </button>
          )}
      </div>
  );
};

export default Page;