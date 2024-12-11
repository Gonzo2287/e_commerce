"use client";

import React, { useEffect, useState } from "react";
import { ButtonAddToCarrito } from "@/components/ButtonAddToCarrito";
import { ComboData } from "../../types/ComboData";

export const Slider = () => {
  const [combos, setCombos] = useState<ComboData[]>([]);
  const [index, setIndex] = useState(0); // Control del índice actual del slider principal

  const traerCombos = async () => {
    try {
      const response = await fetch("/api/combos");
      const datos = await response.json();
      setCombos(datos);
    } catch (error) {
      console.error("Error al traer combos:", error);
    }
  };

  useEffect(() => {
    traerCombos();
  }, []);

  const nextBanner = () => {
    setIndex((prevIndex) => (prevIndex + 1) % combos.length);
  };

  const prevBanner = () => {
    setIndex((prevIndex) => (prevIndex - 1 + combos.length) % combos.length);
  };

  return (
    <div className="bg-slate-900 bg-center bg-cover relative w-full h-4/6 mb-10 shadow-lg shadow-gray-400">
      <div className="overflow-hidden w-full h-full flex items-center justify-center">
        {/* Contenedor de tarjetas */}
        <div
          className="flex gap-4 transition-transform duration-500"
          style={{ transform: `translateX(calc(-${index * 250}px))` }}
        >
          {combos.map((combo, i) => (
            <div
              key={combo.id_combo}
              className={`transition-all duration-300 ${
                index === i ? "scale-90 opacity-100 z-10" : "scale-75 opacity-75"
              }`}
              style={{
                flex: "0 0 250px", // Ancho fijo de las tarjetas
              }}
            >
              <div className="bg-white p-4 rounded-xl shadow-gray-400 shadow-lg">
                <b className="font-extrabold">{combo.nombre.toUpperCase()}</b>
                <p className="mb-2">
                  Descuento:{" "}
                  <span className="text-green-600 font-semibold">
                    {combo.descuento * 100}%
                  </span>
                </p>

                {/* Slider interno de imágenes */}
                <CardImageSlider combo={combo} />

                <div className="mt-4 text-center">
                  {combo.productos.map((comboProducto, idx) => (
                    <div
                      key={`${combo.id_combo}-${comboProducto.id_producto}-${idx}`}
                      className="mb-2"
                    >
                      <div className="text-left text-md font-bold">
                        <span>{comboProducto.producto?.nombre}</span>
                        <span className="ml-2 font-light">
                          $
                          {comboProducto.precioDescuento ||
                            comboProducto.producto?.precio}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="font-bold text-lg mt-2">
                    Total: $
                    {combo.productos.reduce(
                      (total, comboProducto) =>
                        total + (comboProducto.precioDescuento || 0),
                      0
                    )}
                  </div>
                  <div className="mt-4">
                    <ButtonAddToCarrito combo={combo} cantidad={1} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={prevBanner}
        >
          {"<"}
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={nextBanner}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

// Slider interno de imágenes para cada tarjeta
const CardImageSlider = ({ combo }: { combo: ComboData }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % combo.productos.length);
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + combo.productos.length) % combo.productos.length);
  };

  return (
    <div className="relative overflow-hidden rounded-md mt-4 h-[140px] w-full">
      <div
        className="flex transition-transform duration-500"
        style={{
          width: `${combo.productos.length * 100}%`,
          transform: `translateX(-${imageIndex * (100 / combo.productos.length)}%)`,
        }}
      >
        {combo.productos.map((comboProducto, idx) => (
          <img
            key={`${combo.id_combo}-${comboProducto.id_producto}-${idx}`}
            alt={combo.nombre}
            className="w-full h-[140px] object-cover"
            src={comboProducto.producto?.imagen}
          />
        ))}
      </div>

      {/* Botones de navegación */}
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white p-1 rounded-full opacity-50 hover:opacity-100"
        onClick={prevImage}
      >
        {"<"}
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white p-1 rounded-full opacity-50 hover:opacity-100"
        onClick={nextImage}
      >
        {">"}
      </button>
    </div>
  );
};
