"use client"
import { z } from "zod";
import { loginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginAction } from "../../actions/auth-actions";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


 
function FormLogin() {

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError(null);
    startTransition(async () => {
      const res = await loginAction(values);
      if(res.error) {
        setError(res.error);
      }
      else {
        router.push("/")
      }
    });
    
  }

  return (
    <Form {...form}>
      <h1 className="mx-auto w-44 text-lg text-white">INICIAR SESIÓN</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-2/5 mx-auto mt-4 bg-white shadow-md shadow-black p-4 rounded-md">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500 font-bold text-[16px]">Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} type="email" className="rounded-md focus:border focus:border-purple-600 focus:bg-white outline-none mb-4 w-full text-black py-1 pl-2 bg-gray-100"/>
              </FormControl>
              <FormMessage className="text-red-600"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500 font-bold text-[16px]">Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="contraseña" {...field} type="password" className="rounded-md focus:border focus:border-purple-600 focus:bg-white outline-none mb-4 w-full text-black py-1 pl-2 bg-gray-100"/>
              </FormControl>
              <FormMessage className="text-red-600"/>
            </FormItem>
          )}
        />
        {error && <FormMessage>{error}</FormMessage>}
        <Button type="submit" disabled={isPending} className="bg-primary-700 hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded shadow-sm shadow-black">Ingresar</Button>
        <span className="mx-1">- o -</span>
        <Button type="submit" disabled={isPending} className="bg-primary-700 hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded shadow-sm shadow-black"><Link href="/registro">Crear una cuenta</Link></Button>
      </form>
    </Form>
  )
}

export default FormLogin;