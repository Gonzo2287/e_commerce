"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import swal from 'sweetalert';

const UsuarioForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    });

    if(res.status == 200) {
      const correo = data.correo

      const usuarioCreado = await res.json();
      const userId = usuarioCreado.id_usuario;

      const correoRes = await fetch('/api/enviarMail', {
        method: 'POST',
        body: JSON.stringify({ correo, userId }),
        headers: {
            'Content-Type': 'application/json',
        },
      });
      swal("Registro Existoso!", "Cuenta creada con exito!", "success");
      router.push("/auth/login")
    }
    else {
      swal("Error en el registro!", "Error al intentar crear cuenta!", "error");
    }

    // const jsonRes = await res.json();
  });

  return (
    <div className="flex justify-center items-center">
      <form className="bg-white rounded-md p-10 w-2/5 my-10 shadow-md shadow-black" onSubmit={onSubmit}>
        <label htmlFor="nombre" className="text-slate-500 font-bold">
          Nombre
        </label>
        <input
          type="text"
          placeholder="Nombre"
          id="nombre"
          className="rounded-md border focus:border-purple-600 focus:bg-white outline-none mb-4 w-full text-black py-1 pl-2 bg-gray-100"
          {...register("nombre", {
            required: {
              value: true,
              message: "Nombre requerido",
            },
          })}
        />
        {errors.nombre && (
          <span className="text-red-600 font-bold block text-[14px] mb-2">
            {errors.nombre.message?.toString()}
          </span>
        )}

        <label htmlFor="apellido" className="text-slate-500 font-bold">
          Apellido
        </label>
        <input
          type="text"
          placeholder="Apellido"
          id="apellido"
          className="rounded-md border focus:border-purple-600 focus:bg-white outline-none mb-4 w-full text-black py-1 pl-2 bg-gray-100"
          {...register("apellido", {
            required: {
              value: true,
              message: "Apellido requerido",
            },
          })}
        />
        {errors.apellido && (
          <span className="text-red-600 font-bold block text-[14px] mb-2">
            {errors.apellido.message?.toString()}
          </span>
        )}

        <label htmlFor="email" className="text-slate-500 font-bold">
          Email
        </label>
        <input
          type="email"
          placeholder="Correo"
          id="correo"
          className="rounded-md border focus:border-purple-600 focus:bg-white outline-none mb-4 w-full text-black py-1 pl-2 bg-gray-100"
          {...register("correo", {
            required: {
              value: true,
              message: "Email requerido",
            },
          })}
        />
        {errors.correo && (
          <span className="text-red-600 font-bold block text-[14px] mb-2">
            {errors.correo.message?.toString()}
          </span>
        )}

        <label htmlFor="clave" className="text-slate-500 font-bold">
          Contraseña
        </label>
        <input
          type="password"
          placeholder="Contraseña"
          id="clave"
          className="rounded-md border focus:border-purple-600 focus:bg-white outline-none mb-4 w-full text-black py-1 pl-2 bg-gray-100"
          {...register("clave", {
            required: {
              value: true,
              message: "Contraseña requerida",
            },
          })}
        />
        {errors.clave && (
          <span className="text-red-600 font-bold block text-[14px] mb-2">
            {errors.clave.message?.toString()}
          </span>
        )}

        <label htmlFor="telefono" className="text-slate-500 font-bold">
          Telefono
        </label>
        <input
          type="text"
          placeholder="Teléfono"
          id="telefono"
          className="rounded-md border focus:border-purple-600 focus:bg-white outline-none mb-4 w-full text-black py-1 pl-2 bg-gray-100"
          {...register("telefono", {
            required: {
              value: true,
              message: "Telefono requerido",
            },
          })}
        />
        {errors.telefono && (
          <span className="text-red-600 font-bold block text-[14px] mb-2">
            {errors.telefono.message?.toString()}
          </span>
        )}

        <label htmlFor="direccion" className="text-slate-500 font-bold">
          Direccion
        </label>
        <input
          type="text"
          placeholder="Dirección"
          id="direccion"
          className="rounded-md border focus:border-purple-600 focus:bg-white outline-none mb-4 w-full text-black py-1 pl-2 bg-gray-100"
          {...register("direccion", {
            required: {
              value: true,
              message: "Direccion requerida",
            },
          })}
        />
        {errors.direccion && (
          <span className="text-red-600 font-bold block text-[14px] mb-2">
            {errors.direccion.message?.toString()}
          </span>
        )}

        <label htmlFor="localidad" className="text-slate-500 font-bold">
          Localidad
        </label>
        <input
          type="text"
          placeholder="Localidad"
          id="localidad"
          className="rounded-md border focus:border-purple-600 focus:bg-white outline-none mb-4 w-full text-black py-1 pl-1 bg-gray-100"
          {...register("localidad", {
            required: {
              value: true,
              message: "Localidad requerida",
            },
          })}
        />
        {errors.localidad && (
          <span className="text-red-600 font-bold block text-[14px] mb-2">
            {errors.localidad.message?.toString()}
          </span>
        )}

        <button className="bg-primary-700 hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded">
          Crear
        </button>
      </form>
    </div>
  );
};

export default UsuarioForm;
