"use client";
import { CartContext } from "@/context/CartContext";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";

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
        <div className="flex justify-between">
            
            {isMounted && ( // Renderiza solo si el componente está montado
                <div>
                    <p className="text-lg cursor-pointer" onClick={toggleSideBar}>
                        🛒<strong>{cartItems.length}</strong>
                    </p>
                    {/* <Image src="/img/grocery-store.png" alt="" width={32} height={32} className="mr-2" onClick={toggleSideBar}/>*/}
                </div>
            )}
        </div>
    );
};
