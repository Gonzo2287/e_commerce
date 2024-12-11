"use client";
import { CartContext } from "@/context/CartContext";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
    const { cartItems, isCarritoVisible, setCarritoVisible } = useContext(CartContext);
    const [isMounted, setIsMounted] = useState(false); // Estado para verificar montaje

    useEffect(() => {
        setIsMounted(true); // Establecer que el componente se ha montado
    }, []);

    const toggleSideBar = () => {
        setCarritoVisible(!isCarritoVisible); // Cambiar visibilidad usando el estado global del contexto
    };

    return (
        <div className="flex justify-between w-4 absolute top-5 right-40 h-4 z-50">
            
            {isMounted && ( // Renderiza solo si el componente está montado
                <div className="flex w-full">
                    <p className="text-lg cursor-pointer" onClick={toggleSideBar}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    </p>
                    {/* <Image src="/img/grocery-store.png" alt="" width={32} height={32} className="mr-2" onClick={toggleSideBar}/>*/}
                </div>
            )}
        </div>
    );
};
