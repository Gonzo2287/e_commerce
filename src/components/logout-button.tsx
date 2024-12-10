"use client"
import React from 'react'
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"


const LogoutButton = () => {

    const handleClick = async () => {
        await signOut({
            callbackUrl: "/auth/login"
        })
    }

  return (
    <Button className="hover:bg-blue-500" onClick={handleClick}>LogOut</Button>
  )
}

export default LogoutButton