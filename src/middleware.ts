import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from "next/server"

const { auth: middleware } = NextAuth(authConfig)

const publicRoutes = [
  "/",
  "/auth/login",
  "/registro",
  "/error"
];

export default middleware((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;

  console.log({isLoggedIn});
  

  if (!isLoggedIn && !publicRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
} 

