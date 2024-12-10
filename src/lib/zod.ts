import { object, string } from "zod"
 
export const loginSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email requerido")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Contraseña requerida")
    .min(5, "Password must be more than 5 characters")
    .max(32, "Password must be less than 32 characters"),
})