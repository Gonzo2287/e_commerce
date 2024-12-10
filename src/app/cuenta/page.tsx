import { auth } from "@/auth";
import MiCuenta from "./MiCuenta";   

const Page = async () => {
    const session = await auth();
    console.log(session);
    return (
        <div>
            <MiCuenta session={session}/>
        </div>
    )
}

export default Page
