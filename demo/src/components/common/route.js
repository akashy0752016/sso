  import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from '../../pages/Home';
import ObjectDirectory from '../../pages/ObjectDirectory';


function RouteApp() {

    return( <Router>
        <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Object/:objectId" element={<ObjectDirectory />} />
        </Routes>
    </Router>)
   
    
}
export default RouteApp;

