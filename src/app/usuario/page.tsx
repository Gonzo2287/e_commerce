import React from 'react'
import { authorizationPage } from '../../../utils/authorization';
import { getAllUsers } from '../../../utils/usuario';
import Usuarios from '@/components/Usuarios';

const UsuarioPage = async () => {
  
  await authorizationPage({ roles: ["admin", "editor"] });

  const usuarios = await getAllUsers();

  return (
    <>
        <Usuarios data={usuarios}></Usuarios>
    </>
  )
}

export default UsuarioPage