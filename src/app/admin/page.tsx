import { redirect } from "next/navigation"
import { authorizationPage } from "../../../utils/authorization"

const AdminPage = async () => {

  await authorizationPage({ roles: ["admin", "editor", "user"] });

  return (
    <div>
      <h1>Welcome Admin</h1>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre>*/}
    </div>
  )
}

export default AdminPage

