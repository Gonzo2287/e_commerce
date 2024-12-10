import AdministrarPedidos from "./AdministrarPedidos";
import { authorizationPage } from "../../../utils/authorization";


const Page = async () => {
    await authorizationPage({ roles: ["admin", "editor"] });
    return (
        <div>
            <AdministrarPedidos/>
        </div>
    )
}

export default Page