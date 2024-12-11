"use client"
import React from 'react'
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const LogoutButton = () => {

    const handleClick = async () => {
        await signOut({
            callbackUrl: "/auth/login"
        })
    }

  return (
    <Button className="hover:bg-blue-500" onClick={handleClick}>
      LogOut
      <FontAwesomeIcon icon={faRightToBracket} className='ml-1' />
    </Button>
  )
}

export default LogoutButton