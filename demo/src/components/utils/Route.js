  import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from '../../pages/Home';
import ObjectDirectory from '../../pages/ObjectDirectory';
import Login from "../../pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import Callback from "../../pages/Callback";
import Page404 from "../../pages/404";


function RouteApp() {

    return( <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/object/:objectId" element={<ObjectDirectory />} />
            </Route>
            <Route path="*" element={<Page404 />} />
        </Routes>
    </Router>)
   
    
}
export default RouteApp;

