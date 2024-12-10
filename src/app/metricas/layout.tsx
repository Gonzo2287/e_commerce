// Layout.tsx
"use client"
import React from 'react';
import MenuLateral from '@/components/MenuLateral';
import { Carrito } from '@/components/Carrito';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <MenuLateral />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4">{children}</main>
        {/* <Carrito cartItems={[]} removeFromCart={function (productId: number): void {
                  throw new Error('Function not implemented.');
              } } /> */}
      </div>
    </div>
  );
};

export default Layout;