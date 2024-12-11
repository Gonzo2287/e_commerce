"use client";
import React, { useEffect, useState } from 'react';
import { ButtonAddToCarrito } from "@/components/ButtonAddToCarrito";
import { ComboData } from '../../types/ComboData';
import { ProductoData } from '../../types/ProductData';
import { ComboCantidadData } from '../../types/ComboCantidadData';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';


interface Props {
  productos: ProductoData[];
}

const VistaProductos: React.FC<Props> = ({ productos }) => {
  const [filterText, setFilterText] = useState("");
  const [sortOption, setSortOption] = useState<"asc" | "desc">("asc");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [combos, setCombos] = useState<ComboCantidadData[]>([]);
  const [comboCantidad, setComboCantidad] = useState<ComboCantidadData[]>([]);
  const [loading, setLoading] = useState(true);

  const [cantidades, setCantidades] = useState<{ [key: string]: number }>({});
  const [cantidad, setCantidad] = useState(0)

  // Filtrar productos
  const filteredProducts = productos.filter(producto => {
    const matchesText = producto.nombre.toLowerCase().includes(filterText.toLowerCase());
    const matchesBrand = !selectedBrand || producto.marca === selectedBrand;
    const matchesType = !selectedType || producto.tipo === selectedType;
    const matchesPrice = producto.precio >= priceRange[0] && producto.precio <= priceRange[1];

    return matchesText && matchesBrand && matchesType && matchesPrice;
  });

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => 
    sortOption === "asc" ? a.precio - b.precio : b.precio - a.precio
  );


  // Generar opciones de marca y tipo dinámicamente
  const uniqueBrands = Array.from(new Set(productos.map(p => p.marca)));
  const uniqueTypes = Array.from(new Set(productos.map(p => p.tipo)));


  const traerCombos = async () => {
    try {
      const comboCantidadRes = await fetch("http://localhost:3000/api/combosCantidad");
      const comboCantidadData: ComboCantidadData[] = await comboCantidadRes.json();
      setComboCantidad(comboCantidadData);
    } catch (error) {
      console.error("Error al traer combos:", error);
    }
  };


const obtenerComboCantidad = (
  id_producto: number,
  datosComboCantidad: ComboCantidadData[]
): ComboCantidadData | undefined => {
  // Busca un combo relacionado al producto con tipo 'cantidad'
  return datosComboCantidad.find(
    (comboCantidad) => comboCantidad.id_producto === id_producto
  );
};


  useEffect(() => {
    setLoading(true);
    Promise.all([traerCombos()]).finally(() => {
      setLoading(false);
    });
  }, []);

  


  return (
    <div className="flex p-4">
      {/* Tarjeta de filtros a la izquierda */}
      <div className="bg-gray-100 z-40 pt-14 w-2/6 md:w-1/4">
        <div className="bg-white sticky top-14 rounded-tl-xl rounded-b-xl shadow-gray-400 shadow-sm p-4">
          <h2 className="font-semibold mb-2">Filtros</h2>
          <div className="mb-4">
            <label className="block">Marca:</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Seleccionar marca...</option>
              {uniqueBrands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block">Tipo:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Seleccionar tipo</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-between">
            <div className="flex flex-col lg:flex-row w-full justify-center items-center">
              <label className="mr-2">Precio: </label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="border rounded px-2 py-1 w-20"
                min={0}
                max={priceRange[1]}
              />
              <span className="mx-1">-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="border rounded px-2 py-1 w-20"
                min={priceRange[0]}
                max={100000}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta de búsqueda a la derecha */}
      <div className="flex-1">
        <div className='bg-zinc-100 w-full z-30 sticky pt-14 top-0'>
          <div className="bg-white rounded-r-xl rounded-br-xl shadow-gray-400 shadow-sm p-4 mb-4">
            <h2 className="font-semibold mb-2">Buscar Producto</h2>
            <div className="mb-4 flex">
              <input
                type="text"
                placeholder="Buscar producto..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>  
          </div>
        </div>

        <div className="ml-4 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((producto) => {
            const combo = obtenerComboCantidad(Number(producto.id_producto), comboCantidad);


            return (
              <Card
                className="relative flex bg-white rounded-xl z-20 shadow-gray-400 shadow-sm overflow-visible"
                shadow="lg"
                key={producto.id_producto}
              >
                <CardBody className="flex overflow-visible p-0 text-center">
                  <Image
                    shadow="lg"
                    radius="lg"
                    width="100%"
                    alt={producto.nombre}
                    className="w-full rounded-t-md rounded-tl-md object-cover h-[240px]"
                    src={producto.imagen}
                  />
                </CardBody>
                <CardFooter className="mt-3 flex flex-col text-small w-full h-auto">
                  {producto.cantidad > 0 ? (
                    <div className='text-left w-full'>
                      {combo && (
                        <p className="text-green-600 font-semibold mt-2">
                          ¡Descuento del {combo.descuento}% si compras {combo.cantidad_minima} o más!
                        </p>
                      )}
                      <b className="font-extrabold mb-auto">{producto.nombre.toUpperCase()}</b>
                      <p className="text-slate-500 text-lg font-normal mt-2">{producto.descripcion}</p>
                      <p className="text-lg font-extrabold mt-2">${producto.precio}</p>
                      {/* Mostrar mensaje de combo si aplica */}
                      
                    </div>
                  ) : (
                    <p className="text-red-500 font-semibold">SIN STOCK</p>
                  )}
                </CardFooter>
                <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2">
                  <ButtonAddToCarrito
                    producto={producto}
                    cantidad={cantidades[producto.id_producto.toString()] || 1}
                  />
                </div>
              </Card>
            );
          })}
        </div>


      </div>
    </div>
  );
};

export default VistaProductos;