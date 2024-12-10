'use client';

import React, { ReactNode } from 'react';
import { CartProvider } from '../context/CartContext';
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <NextUIProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;
