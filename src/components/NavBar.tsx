import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "./logout-button";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import React, { useState } from "react";
import ReenviarMail from "./ReenviarMail";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faBagShopping, faTruck } from '@fortawesome/free-solid-svg-icons';

const NavBar = async () => {
  
  const session = await auth();
  const cuentaVerificada = session?.user?.cuentaVerificada;

  console.log("Session en NavBar: ", session);

  const handleClick = async () => {
      const session = await auth();

      const correo = session?.user.email
      const userId = session?.user.id;

      const correoRes = await fetch('/api/enviarMail', {
        method: 'POST',
        body: JSON.stringify({ correo, userId }),
        headers: {
            'Content-Type': 'application/json',
        },
      });
  }

  return (
    <>
    <Navbar className="fixed bg-white z-50 p-4">
      <NavbarBrand>
        <p className="font-bold text-inherit">E-commerce</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 " justify="center">
        <NavbarItem className="hover:text-secondary-700">
          <Link color="foreground" href="/" className="flex justify-center items-center">
            <FontAwesomeIcon icon={faHouse} className="h-4 mr-1" />
            Home
          </Link>
        </NavbarItem>
        <NavbarItem className="hover:text-secondary-700">
          <Link href="/compras" className="flex justify-center items-center">
            <FontAwesomeIcon icon={faBagShopping} className="h-4 mr-1" />
            Mis Compras
          </Link>
        </NavbarItem>
        <NavbarItem className="hover:text-secondary-700">
          <Link href="/cuenta" className="flex justify-center items-center">
            <FontAwesomeIcon icon={faUser} className="h-4 mr-1" />
            Mi Cuenta
          </Link>
        </NavbarItem>
        {!session?.user ? (
          <>
            <NavbarItem className="hover:text-secondary-700">
              <Link href="/auth/login">Login</Link>
            </NavbarItem>
            <NavbarItem className="hover:text-secondary-700">
              <Link href="/registro">Register</Link>
            </NavbarItem>
          </>
        ) : (
          <>
            {
              session?.user?.role === "admin" && (
                  <>
                    <NavbarItem className="hover:text-secondary-700">
                      <Link href="/producto">Productos</Link>
                    </NavbarItem>
                    <NavbarItem className="hover:text-secondary-700">
                      <Link href="/combos">Combos</Link>
                    </NavbarItem>
                    <NavbarItem className="hover:text-secondary-700">
                      <Link href="/usuario">Usuarios</Link>
                    </NavbarItem>
                  <>
                  <NavbarItem className="hover:text-secondary-700">
                    <Link href="/dashboard">Dashboard</Link>
                  </NavbarItem>                  
                    </>
                  <NavbarItem className="hover:text-secondary-700">
                    <Link href="/pedidosAdmin">
                      <FontAwesomeIcon icon={faTruck} />
                      Pedidos
                    </Link>
                  </NavbarItem>
                </>
              )
            }

            <NavbarContent justify="end">
              <NavbarItem className="hidden lg:flex">
                <LogoutButton />
              </NavbarItem>
            </NavbarContent>
          </>
        )}
      </NavbarContent>

    </Navbar>
    {!cuentaVerificada && session?.user && (
        <div className="bg-red-500 text-white text-center py-2 fixed top-[60px] w-full z-50">
          Tu cuenta no está verificada.{" "}
          {session?.user?.email && session?.user?.id && (
  <ReenviarMail correo={session.user.email} userId={session.user.id} />
)}
        </div>
      )}
    </>
  );
};

export default NavBar;