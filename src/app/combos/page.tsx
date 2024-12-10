import AdminCombos from "./CrearCombos";
import { obtenerProductos } from "../../../utils/producto";
import { authorizationPage } from "../../../utils/authorization";

const Page = async () => {

    await authorizationPage({ roles: ["admin"] });
    
    const response = await obtenerProductos();
    
    const productos = Array.isArray(response)
    ? response.map((producto: any) => ({
        id_producto: producto.id_producto,
        nombre: producto.nombre || "",          
        descripcion: producto.descripcion || "",
        imagen: producto.imagen || "",
        precio: producto.precio || 0,
        cantidad: producto.cantidad || 0,
        marca: producto.marca || "",
        tipo: producto.tipo || "",
    }))
    : [];

    return (
        <div>
            <AdminCombos/>
        </div>
    )
}

export default Page