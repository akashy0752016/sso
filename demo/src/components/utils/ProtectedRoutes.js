import { Outlet, Navigate } from "react-router-dom";
import { checkIsLoggedIn } from "./Middleware";
const ProtectedRoutes = () => {
    const user = checkIsLoggedIn();
    return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes;