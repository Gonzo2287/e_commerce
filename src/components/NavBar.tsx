import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "./logout-button";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import React, { useState } from "react";

const NavBar = async () => {
  
  const session = await auth();
  console.log("Session en NavBar: ", session);

  return (
    <Navbar className="fixed bg-white z-50 p-2">
      <NavbarBrand>
        <p className="font-bold text-inherit">E-commerce</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 " justify="center">
        <NavbarItem className="hover:text-blue-500">
          <Link color="foreground" href="/">Home</Link>
        </NavbarItem>
        <NavbarItem className="hover:text-blue-500">
          <Link href="/compras">Mis Compras</Link>
        </NavbarItem>
        <NavbarItem className="hover:text-blue-500">
          <Link href="/cuenta">Mi Cuenta</Link>
        </NavbarItem>
        {!session?.user ? (
          <>
            <NavbarItem className="hover:text-blue-500">
              <Link href="/auth/login">Login</Link>
            </NavbarItem>
            <NavbarItem className="hover:text-blue-500">
              <Link href="/registro">Register</Link>
            </NavbarItem>
          </>
        ) : (
          <>
            {
              session?.user?.role === "admin" && (
                  <>
                    <NavbarItem className="hover:text-blue-500">
                      <Link href="/producto">Productos</Link>
                    </NavbarItem>
                    <NavbarItem className="hover:text-blue-500">
                      <Link href="/combos">Combos</Link>
                    </NavbarItem>
                    <NavbarItem className="hover:text-blue-500">
                      <Link href="/usuario">Usuarios</Link>
                    </NavbarItem>
                  <>
                  <NavbarItem className="hover:text-blue-500">
                    <Link href="/dashboard">Dashboard</Link>
                  </NavbarItem>                  
                    </>
                  <NavbarItem className="hover:text-blue-500">
                    <Link href="/pedidosAdmin">Pedidos</Link>
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
  );
};

export default NavBar;