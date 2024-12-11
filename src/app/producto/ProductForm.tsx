"use client";
import React, { useEffect, useState } from "react";
import { ProductoData } from "../../../types/ProductData";
import CargandoSpinner from "@/components/CargandoSpinner";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

interface Props {
  productos: ProductoData[];
}

const ProductForm: React.FC<Props> = ({ productos }) => {
  const [filterText, setFilterText] = useState("");
  const [sortOption, setSortOption] = useState<"asc" | "desc">("asc");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [productosData, setProductosData] = useState<ProductoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [marca, setMarca] = useState('');
  const [tipo, setTipo] = useState('');
  const [editProductoId, setEditProductoId] = useState<number | null>(null);
  const [CrearProducto, setCrearProducto] = useState(false);

  // Traer productos de la API
  const traerProductos = async () => {
    try {
      const respuesta = await fetch("/api/producto");
      const datos = await respuesta.json();
      setProductosData(datos);
    } catch (error) {
      console.error("Error al traer productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    traerProductos();
  }, []);

  // Filtrar productos
  const filteredProducts = productosData.filter(producto => {
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

  const uniqueBrands = Array.from(new Set(productos.map(p => p.marca)));
  const uniqueTypes = Array.from(new Set(productos.map(p => p.tipo)));

  const eliminarProductoLocal = async (id_producto: number) => {
    try {
      const respuesta = await fetch(`/api/producto/${id_producto}`, { method: 'DELETE' });
      if (!respuesta.ok) throw new Error('Error al eliminar el producto');
      setProductosData(prev => prev.filter(producto => producto.id_producto !== id_producto.toString()));
    } catch (error) {
      console.error(error);
    }
  };

  const editarProductoLocal = async (id_producto: number) => {
    try {
      const productData = {
        nombre,
        descripcion,
        imagen: imagenUrl,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad, 10),
        marca,
        tipo,
      };

      const respuesta = await fetch(`/api/producto/${id_producto}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!respuesta.ok) throw new Error('Error al editar el producto');

      traerProductos();
      resetForm();
      setCrearProducto(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditarClick = (producto: ProductoData) => {
    setEditProductoId(Number(producto.id_producto));
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setImagenUrl(producto.imagen);
    setPrecio(producto.precio.toString());
    setCantidad(producto.cantidad.toString());
    setMarca(producto.marca);
    setTipo(producto.tipo);
    setCrearProducto(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      nombre,
      descripcion,
      imagen: imagenUrl,
      precio: parseFloat(precio),
      cantidad: parseInt(cantidad, 10),
      marca,
      tipo,
    };

    try {
      const response = editProductoId !== null
        ? await fetch(`/api/producto/${editProductoId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(productData) })
        : await fetch('/api/producto', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(productData) });

      if (!response.ok) throw new Error('Error al enviar el producto');

      traerProductos();
      resetForm();
      setCrearProducto(false);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setNombre('');
    setDescripcion('');
    setImagenUrl('');
    setPrecio('');
    setCantidad('');
    setMarca('');
    setTipo('');
    setEditProductoId(null);
  };

    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <CargandoSpinner />
            ) : (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Administrar Productos</h1>
                    {/* Botón para mostrar el formulario de crear combos */}
                    <button 
                        onClick={() => { setCrearProducto(true); resetForm(); }} // Reinicia el formulario para crear un nuevo combo
                        className="fixed right-4 bottom-4 bg-blue-500 text-white text-2xl font-bold py-2 px-4 rounded-full hover:bg-blue-600"
                    >
                        +
                    </button>
                    {/* Modal para crear o editar combos */}
                    {CrearProducto && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="flex-1 p-6 bg-gray-100 rounded-lg shadow-md max-w-2xl w-full flex flex-col">
                                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                                        {editProductoId !== null ? "Editar Producto" : "Crear Producto"}
                                    </h2>
                                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
                                        {/* Nombre y Descripción */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <div>
                                                <label htmlFor="nombre" className="block text-sm font-medium text-gray-800">Nombre:</label>
                                                <input
                                                    type="text"
                                                    id="nombre"
                                                    value={nombre}
                                                    onChange={(e) => setNombre(e.target.value)}
                                                    required
                                                    className="mt-2 block h-11 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-800">Descripción:</label>
                                                <textarea
                                                    id="descripcion"
                                                    value={descripcion}
                                                    onChange={(e) => setDescripcion(e.target.value)}
                                                    required
                                                    className="mt-2 block h-11 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                        {/* URL de Imagen */}
                                        <div className="mb-6">
                                            <label htmlFor="imagenUrl" className="block text-sm font-medium text-gray-800">URL de la Imagen:</label>
                                            <div className="flex items-center gap-4 mt-2">
                                                <input
                                                    type="text"
                                                    id="imagenUrl"
                                                    value={imagenUrl}
                                                    onChange={(e) => setImagenUrl(e.target.value)}
                                                    required
                                                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                {imagenUrl && (
                                                    <img src={imagenUrl} alt="Vista previa" className="w-32 h-32 rounded-lg shadow-md object-cover" />
                                                )}
                                            </div>
                                        </div>
                                        {/* Precio y Cantidad */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <div>
                                                <label htmlFor="precio" className="block text-sm font-medium text-gray-800">Precio:</label>
                                                <input
                                                    type="number"
                                                    id="precio"
                                                    value={precio}
                                                    onChange={(e) => setPrecio(e.target.value)}
                                                    required
                                                    className="mt-2 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="cantidad" className="block text-sm font-medium text-gray-800">Cantidad:</label>
                                                <input
                                                    type="number"
                                                    id="cantidad"
                                                    value={cantidad}
                                                    onChange={(e) => setCantidad(e.target.value)}
                                                    required
                                                    className="mt-2 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                        {/* Marca y Tipo */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <div>
                                                <label htmlFor="marca" className="block text-sm font-medium text-gray-800">Marca:</label>
                                                <input
                                                    type="text"
                                                    id="marca"
                                                    value={marca}
                                                    onChange={(e) => setMarca(e.target.value)}
                                                    required
                                                    className="mt-2 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="tipo" className="block text-sm font-medium text-gray-800">Tipo:</label>
                                                <input
                                                    type="text"
                                                    id="tipo"
                                                    value={tipo}
                                                    onChange={(e) => setTipo(e.target.value)}
                                                    required
                                                    className="mt-2 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                        {/* Botones */}
                                        <div className="flex justify-end gap-4">
                                            <button
                                                type="submit"
                                                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                                            >
                                                {editProductoId !== null ? "Actualizar Producto" : "Crear Producto"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setCrearProducto(false)}
                                                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                            </div>
                        </div>
                    )}

                <div className="w-full flex flex-wrap">
                    <div className="w-1/4">
                        <div className="bg-white shadow-gray-400  shadow-lg rounded p-4">
                        <h2 className="font-semibold mb-2">Filtros</h2>
                        <div className="mb-4">
                            <label className="block">Marca:</label>
                            <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                            <option value="">Todas las marcas</option>
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
                            <option value="">Todos los tipos</option>
                            {uniqueTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                            </select>
                        </div>
                        
                        <div className="flex justify-between">
                            <div className="flex items-center">
                            <label className="mr-2">Precio: </label>
                            <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                className="border rounded px-2 py-1 w-24"
                                min={0}
                                max={priceRange[1]}
                            />
                            <span className="mx-2">-</span>
                            <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                className="border rounded px-2 py-1 w-24"
                                min={priceRange[0]}
                                max={100000}
                            />
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="flex-1 ml-4">
                        <div className="bg-white rounded-xl shadow-gray-400 shadow-lg p-4 mb-4">
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
                        

                        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                        {sortedProducts.map((producto) => (
                            <Card className='relative bg-white p-2 rounded-xl shadow-gray-400 shadow-lg overflow-visible' shadow="lg" key={producto.id_producto}>
                            <CardBody className="overflow-visible p-0 text-center">
                            <b className='font-extrabold mb-auto'>{(producto.nombre).toUpperCase()}</b>
                            <div className="h-0.5 bg-gray-300 w-full my-auto"></div>
                            <Image
                                shadow="lg"
                                radius="lg"
                                width="100%"
                                alt={producto.nombre}
                                className="w-full shadow-gray-700  shadow-lg rounded-md object-cover h-[140px]"
                                src={producto.imagen}
                            />
                            </CardBody>
                            <CardFooter className="flex text-small items-center justify-between">
                                <p>Precio: ${(producto.precio)}</p>
                                <p>Stock: {(producto.cantidad)}</p>
                            </CardFooter>
                            <div className='text-white flex justify-center items-centerpx-6 pb-2 absolute bottom-[-30px] left-1/2 transform -translate-x-1/2'>
                                <button 
                                    onClick={() => handleEditarClick(producto)} 
                                    className="rounded-lg bg-blue-500 p-2 hover:bg-blue-700 mr-2 shadow-gray-400  shadow-lg "
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => eliminarProductoLocal(Number(producto.id_producto))} 
                                    className="rounded-lg bg-red-500 p-2 hover:bg-red-700 shadow-gray-400  shadow-lg "
                                >
                                    Eliminar
                                </button>
                            </div>
                        </Card>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default ProductForm;
