import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import db from "./lib/db";

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    // jwt() se ejecuta cada vez que se crea o actualiza un token JWT
    // Aqui puedes agregar informacion adicional al token
    async jwt({ token, user }) {
      if (user) { // El usuario estara disponible durante el login
        token.role = user.role;
        token.puntos = user.puntos;
        // token.id = user.id;
        token.sub = user.id;
      }
      return token
    },
    // session() se utiliza para agregar la informacion del token a la session del usuario
    // Permite que la informacion del token este disponible en el cliente
    async session({ session, token }) {
      if(session.user) {
        session.user.role = token.role;
        session.user.puntos = token.puntos;
        // session.user.id = token.id || "";
        session.user.id = token?.sub?.toString() || '';
      }
      return session
    },
  },
})