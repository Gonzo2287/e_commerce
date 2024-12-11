"use client";
import React, { useEffect, useState } from "react";
import CargandoSpinner from "@/components/CargandoSpinner";
import { ComboData } from "../../../types/ComboData";
import { ProductoData } from "../../../types/ProductData";
import { ComboCantidadData } from "../../../types/ComboCantidadData";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

const AdminCombos = () => {
    const [combos, setCombos] = useState<ComboData[]>([]);
    const [combosCantidad, setCombosCantidad] = useState<ComboCantidadData[]>([]);
    const [productosData, setProductosData] = useState<ProductoData[]>([]);
    const [productos, setProductos] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [nombre, setNombre] = useState("");
    const [descuento, setDescuento] = useState("");
    const [id_usuario, setId_usuario] = useState("");
    const [editComboId, setEditComboId] = useState<number | null>(null);
    const [isCreatingCombo, setIsCreatingCombo] = useState(false); // Estado para manejar la visibilidad del formulario
    const [isCreatingComboCantidad, setIsCreatingComboCantidad] = useState(false);
    const [id_comboCantidad, setId_comboCantidad] = useState<number | null>(null);
    const [id_producto, setId_producto] = useState<number | null>(null);
    const [cantidad_minima, setCantidad_minima] = useState<number | null>(null);
    const [descuentoComboCantidad, setDescuentoComboCantidad] = useState<number>(0);


    const traerCombos = async () => {
        try {
            const respuesta = await fetch("/api/combos");
            const datos = await respuesta.json();
            setCombos(datos);
        } catch (error) {
            console.error("Error al traer combos:", error);
        }
    };

    const traerCombosCantidad = async () => {
        try {
            const respuesta = await fetch("/api/combosCantidad");
            const datos = await respuesta.json();
            setCombosCantidad(datos);
        } catch (error) {
            console.error("Error al traer combos:", error);
        }
    };

    const traerProductos = async () => {
        try {
            const respuesta = await fetch("/api/producto");
            const datos = await respuesta.json();
            setProductosData(datos);
        } catch (error) {
            console.error("Error al traer productos:", error);
        }
    };

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            await traerCombos();
            await traerCombosCantidad();
            await traerProductos();
        };
        fetchData().finally(() => {
            setLoading(false);
        });
    }, []);

    const eliminarCombo = async (id_combo: number) => {
        try {
            const respuesta = await fetch(`/api/combos/${id_combo}`, {
                method: 'DELETE',
            });
            if (!respuesta.ok) {
                throw new Error('Error al eliminar el combo');
            }
            console.log('Combo eliminado exitosamente');
            setCombos((prevCombos) => prevCombos.filter(combo => combo.id_combo !== id_combo));
        } catch (error) {
            console.error(error);
        }
    };
    const eliminarComboCantidad = async (id_comboCantidad: number) => {
        try {
            const respuesta = await fetch(`/api/combosCantidad/${id_comboCantidad}`, {
                method: 'DELETE',
            });
            if (!respuesta.ok) {
                throw new Error('Error al eliminar el combo');
            }
            console.log('Combo eliminado exitosamente');
            setCombosCantidad((prevCombos) => prevCombos.filter(combo => combo.id_comboCantidad !== id_comboCantidad));
        } catch (error) {
            console.error(error);
        }
    };

    const editarCombo = async (id_combo: number) => {
        try {
            const comboData = {
                nombre,
                descuento: parseFloat(descuento),
                productos: productos.map(id => ({ id_producto: id })),
                id_usuario: (parseInt(id_usuario, 10))
            };

            const respuesta = await fetch(`/api/combos/${id_combo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comboData),
            });

            if (!respuesta.ok) {
                throw new Error('Error al editar el combo');
            }

            console.log('Combo editado exitosamente');
            traerCombos();
            resetForm(); // Resetea el formulario después de editar
            setIsCreatingCombo(false); // Cierra la modal
        } catch (error) {
            console.error(error);
        }
    };
    
    const editarComboCantidad = async (id_comboCantidad: number) => {
        try {
            const comboCantidadData = {
                // nombre,
                id_comboCantidad: id_comboCantidad,
                id_producto: id_producto,
                cantidad_minima: cantidad_minima,
                descuento: descuentoComboCantidad,
            };

            const respuesta = await fetch(`/api/combosCantidad/${id_comboCantidad}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comboCantidadData),
            });

            if (!respuesta.ok) {
                throw new Error('Error al editar el combo');
            }

            console.log('Combo editado exitosamente');
            traerCombosCantidad();
            resetFormComboCantidad(); // Resetea el formulario después de editar
            setIsCreatingComboCantidad(false); // Cierra la modal
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditarClick = (combo: ComboData) => {
        setEditComboId(combo.id_combo);
        setNombre(combo.nombre);
        setDescuento(combo.descuento.toString());
        setProductos(combo.productos ? combo.productos.map((prod) => prod.id_producto) : []);
        setId_usuario(combo.id_usuario.toString());
        setIsCreatingCombo(true);
    };

    const handleEditarComboCantidad = (combo: ComboCantidadData) => {
        setEditComboId(combo.id_comboCantidad);
        // setNombre(combo.nombre);
        setId_producto(combo.id_producto);
        setCantidad_minima(combo.cantidad_minima);
        setDescuentoComboCantidad(combo.descuento);
        setIsCreatingComboCantidad(true);
    };

    const handleAgregarProducto = (productoNum: number) => {
        setProductos((prevProductos) => [...prevProductos, productoNum]);
    };
    

    const handleEliminarProducto = (index: number) => {
        const nuevosProductos = productos.filter((_, i) => i !== index);
        setProductos(nuevosProductos);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editComboId !== null) {
            editarCombo(editComboId);
        } else {
            const descuentoInt = Math.round(parseFloat(descuento));
            if (descuentoInt < 0 || descuentoInt > 100) {
                console.error("El descuento debe estar entre 0 y 100.");
                return;
            }
            const descuentoFloat = parseFloat((descuentoInt / 100).toFixed(2));
            const comboData = {
                nombre,
                descuento: descuentoFloat,
                productos: productos.map(id => ({ id_producto: id })),
                id_usuario: (parseInt(id_usuario, 10)),
            };

            try {
                const response = await fetch('/api/combos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(comboData),
                });

                if (!response.ok) {
                    throw new Error('Error al crear el combo');
                }

                // const result = await response.json();
                // setCombos((prevCombos) => [...prevCombos, result]);
                const responseCombos = await fetch('/api/combos');
                const combosActualizados = await responseCombos.json();
                
                setCombos(combosActualizados);
                resetForm();
                setIsCreatingCombo(false);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const resetForm = () => {
        setNombre('');
        setDescuento('');
        setProductos([]);
        setId_usuario('');
        setEditComboId(null);
    };

    const resetFormComboCantidad = () => {
        setId_comboCantidad(null);
        setId_producto(null);
        setCantidad_minima(null);
        setDescuentoComboCantidad(0);
        setEditComboId(null);
    };
    
    const handleSubmitComboCantidad = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editComboId !== null) {
            editarComboCantidad(editComboId);
        } else {
            const comboCantidadData: ComboCantidadData = {
                id_comboCantidad: id_comboCantidad!,
                id_producto: id_producto!,
                cantidad_minima: cantidad_minima!,
                descuento: descuentoComboCantidad!,
            };
        
            try {
                const response = await fetch('/api/combosCantidad', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(comboCantidadData),
                });
            
                if (!response.ok) {
                    throw new Error('Error al crear ComboCantidad');
                }
            
                // const result = await response.json();
                const responseCombosCantidad = await fetch('/api/combosCantidad');
                const combosCantidadActualizados = await responseCombosCantidad.json();
                // setCombosCantidad((prevCombosCantidad) => [...prevCombosCantidad, result]);
                setCombosCantidad(combosCantidadActualizados);
                resetFormComboCantidad();
                setIsCreatingComboCantidad(false);
            } catch (error) {
                console.error('Error al crear ComboCantidad:', error);
            }
        }
    };


    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <CargandoSpinner />
            ) : (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Administrar Combos</h1>

                    <div className="flex w-full justify-between">
                        {/* Botón para mostrar el formulario de crear combos */}
                        <button 
                            onClick={() => { setIsCreatingCombo(true); resetForm(); }} // Reinicia el formulario para crear un nuevo combo
                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-t-md hover:bg-blue-600"
                        >
                            Nuevo combo de productos
                        </button>
                        
                        {/* Botón para mostrar el formulario de crear combos POR CANTIDAD */}
                        <button 
                            onClick={() => { setIsCreatingComboCantidad(true); resetFormComboCantidad(); }} // Reinicia el formulario para crear un nuevo combo
                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-t-md hover:bg-blue-600"
                        >
                            Nuevo combo por cantidad
                        </button>
                    </div>

                    {/* Modal para crear o editar combos */}
                    {isCreatingCombo && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl w-full flex">
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold mb-4">{editComboId !== null ? "Editar Combo" : "Crear Combo"}</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-900">Nombre:</label>
                                            <input
                                                type="text"
                                                id="nombre"
                                                value={nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                                required
                                                className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="descuento" className="block text-sm font-medium text-gray-700">Descuento (%):</label>
                                            <input
                                                type="number"
                                                id="descuento"
                                                value={descuento}
                                                onChange={(e) => setDescuento(e.target.value)}
                                                required
                                                className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <label htmlFor="productos" className="block text-sm font-medium text-gray-700 mb-2">Productos Seleccionados:</label>
                                        <ul className="mb-4">
                                            {productos.map((prod, index) => (
                                                <li key={index} className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded">
                                                    {prod}
                                                    <button 
                                                        type="button" 
                                                        onClick={() => handleEliminarProducto(index)} 
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        ✕
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mb-4">
                                            <label htmlFor="id_usuario" className="block text-sm font-medium text-gray-700">ID Admin:</label>
                                            <input
                                                type="number"
                                                id="id_usuario"
                                                value={id_usuario}
                                                onChange={(e) => setId_usuario(e.target.value)}
                                                required
                                                className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                                            {editComboId !== null ? "Actualizar Combo" : "Crear Combo"}
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => setIsCreatingCombo(false)} 
                                            className="ml-4 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
                                        >
                                            Cancelar
                                        </button>
                                    </form>
                                </div>

                                <div className="flex-1 ml-4">
                                    <h2 className="text-xl font-semibold mb-4">Lista de Productos</h2>
                                    <ul className="max-h-[400px] overflow-y-auto">
                                        {productosData.map((producto) => (
                                            <li key={producto.id_producto} className="flex justify-between items-center mb-2 p-2 border border-gray-300 rounded">
                                                <span>{producto.nombre}</span>
                                                <button 
                                                   onClick={() => handleAgregarProducto(parseInt(producto.id_producto))}
                                                    className="bg-green-500 text-white font-semibold py-1 px-2 rounded hover:bg-green-600"
                                                >
                                                    Agregar
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal para crear o editar combos POR CANTIDAD */}
                    {isCreatingComboCantidad && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl w-full flex flex-col">
                                <h2 className="text-xl font-semibold mb-4">{editComboId !== null ? "Editar Combo" : "Crear Combo"}</h2>
                                <form onSubmit={handleSubmitComboCantidad}>
                                    <div className="mb-4">
                                        <label htmlFor="id_producto" className="block text-sm font-medium text-gray-700">
                                            Seleccionar Producto:
                                        </label>
                                        <select
                                            id="id_producto"
                                            value={id_producto ?? ""}
                                            onChange={(e) => setId_producto(parseInt(e.target.value, 10))}
                                            required
                                            className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="" disabled>Selecciona un producto</option>
                                            {productosData.map((producto) => (
                                                <option key={producto.id_producto} value={producto.id_producto}>
                                                    {producto.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            htmlFor="cantidad_minima"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Cantidad Mínima:
                                        </label>
                                        <input
                                            type="number"
                                            id="cantidad_minima"
                                            value={cantidad_minima ?? ""}
                                            onChange={(e) => setCantidad_minima(parseInt(e.target.value, 10))}
                                            required
                                            className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>


                                    <div className="mb-4">
                                        <label
                                            htmlFor="descuento"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Descuento (%):
                                        </label>
                                        <input
                                            type="number"
                                            id="descuento"
                                            value={descuentoComboCantidad}
                                            onChange={(e) => setDescuentoComboCantidad(parseFloat(e.target.value))}
                                            required
                                            className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>


                                    <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                                            {editComboId !== null ? "Actualizar Combo" : "Crear Combo"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsCreatingComboCantidad(false)}
                                        className="ml-4 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
                                    >
                                        Cancelar
                                    </button>
                                    
                                </form>
                            </div>
                        </div>
                    )}




                    <div className="bg-white p-4 pb-10 gap-2 grid grid-cols-2 sm:grid-cols-4">
                        {combos.map((combo) => (
                            <Card className='relative bg-white p-2 rounded-xl shadow-gray-400 shadow-lg overflow-visible' shadow="lg" key={combo.id_combo}>
                                <CardBody className="overflow-visible p-0 text-center">
                                    <li key={combo.id_combo} className="flex flex-col justify-between items-center mb-2 p-2 border border-gray-300 rounded">
                                        <div>
                                            <p>{combo.nombre}</p>
                                            <p>
                                                Descuento: 
                                                <span className=" font-bold text-green-600">
                                                    {(combo.descuento * 100).toFixed(0)}%
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <p>Productos:</p>
                                            <ul>
                                                {(combo.productos && Array.isArray(combo.productos) ? combo.productos : []).map((producto) => {
                                                    const productoEncontrado = productosData.find((prod) => prod.id_producto === producto.id_producto.toString());
                                                    return (
                                                        <li key={producto.id_producto}>
                                                            {productoEncontrado ? productoEncontrado.nombre : `Producto ID: ${producto.id_producto}`}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </li>
                                </CardBody>
                                <CardFooter className="flex flex-col text-small justify-between">
                                    <div className="text-white flex justify-center items-centerpx-6 pb-2 absolute bottom-[-30px] left-1/2 transform -translate-x-1/2">
                                        <button 
                                            onClick={() => handleEditarClick(combo)} 
                                            className="rounded-lg bg-blue-500 p-2 hover:bg-blue-700 mr-2 shadow-gray-400  shadow-lg"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => eliminarCombo(combo.id_combo)} 
                                            className="rounded-lg bg-red-500 p-2 hover:bg-red-700 shadow-gray-400  shadow-lg "
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                        {combosCantidad.map((comboCantidad) => (
                            <Card className='relative bg-white p-2 rounded-xl shadow-gray-400 shadow-lg overflow-visible' shadow="lg" key={comboCantidad.id_comboCantidad}>
                                <CardBody className="overflow-visible p-0 text-center">
                                    <li key={comboCantidad.id_comboCantidad} className="flex flex-col justify-between items-center mb-2 p-2 border border-gray-300 rounded">
                                        {productosData.map((producto) => 
                                            comboCantidad.id_producto.toString() === producto.id_producto && (
                                                <div>
                                                    <p>Producto: {producto.nombre}</p>
                                                    <Image
                                                        shadow="lg"
                                                        radius="lg"
                                                        width="100%"
                                                        alt={producto.nombre}
                                                        className="w-full shadow-gray-700  shadow-lg rounded-md object-cover h-[140px]"
                                                        src={producto.imagen}
                                                    />
                                                </div>
                                            )
                                        )}
                                        <p>Descuento: 
                                            <span className=" font-bold text-green-600">
                                                {comboCantidad.descuento}%
                                            </span>
                                        </p>
                                        <p>Cantidad Mínima:{comboCantidad.cantidad_minima}</p>
                                    </li>
                                </CardBody>
                                <CardFooter>
                                    <div className="text-white flex justify-center items-center px-6 pb-2 absolute bottom-[-30px]">
                                        <button 
                                            onClick={() => handleEditarComboCantidad(comboCantidad)} 
                                            className="rounded-lg bg-blue-500 p-2 hover:bg-blue-700 mr-2 shadow-gray-400 shadow-lg"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => eliminarComboCantidad(comboCantidad.id_comboCantidad)} 
                                            className="rounded-lg bg-red-500 p-2 hover:bg-red-700 shadow-gray-400 shadow-lg "
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCombos;
