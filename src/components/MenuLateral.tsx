import Link from 'next/link';
import React from 'react';

const MenuLateral = () => {
  
  return (
    <div className="w-64 rounded-tr-md border-r-2 p-4 bg-primary-700 mt-10">
      <h2 className="text-lg font-bold border-b-2 mb-2">MENU MÉTRICAS</h2>
      <ul className='text-slate-700 text-[14px] flex-col space-y-4 font-bold'>
        <li>
          
        </li>
        <li className='hover:outline sm:outline-offset-1 rounded-md pl-1 cursor-pointer'>
          <Link href="/dashboard/pedidos">PEDIDOS</Link>
        </li>
        <li className='hover:outline sm:outline-offset-1 rounded-md pl-1 cursor-pointer'>
          <Link href="/dashboard/productos">PRODUCTOS</Link>
        </li>
        <li className='hover:outline sm:outline-offset-1 rounded-md pl-1 cursor-pointer'>
          <a href="/dashboard/ventas">VENTAS</a>
        </li>
        {/* <li>
          <Link href="/dashboard">Categorías</Link>
        </li>
        <li>
          <Link href="/productos">Productos</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default MenuLateral;