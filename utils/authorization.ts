import { auth } from "@/auth"
import { redirect } from "next/navigation";


interface AuthorizationProps {
    roles: string[];
}


export const authorizationPage = async ({roles}: AuthorizationProps) => {

    const session = await auth();
    const roleUser =  session?.user?.role;
    
    if (!roleUser || !roles.includes(roleUser)) {
        redirect("/auth/login")
    }
}


