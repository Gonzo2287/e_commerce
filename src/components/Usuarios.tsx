import React from 'react'
import { UsuarioData } from '../../types/UsuarioData';
import { $Enums } from '@prisma/client';



const Usuarios = ({ data }:any) => {
  console.log("Data en usuarios.tsx: ", data);
    return (
      <div>
        {/* Iteramos sobre 'data' con map */}
        {/* data.map(({usuario}:any) => (
          <div key={usuario.id_usuario}>
            <p>{usuario.nombre}</p>
            <p>{usuario.apellido}</p>
            <p>{usuario.correo}</p>
          </div>
        ))*/}
      </div>
    );
  }

export default Usuarios