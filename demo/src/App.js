import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from './pages/Home';
import ObjectDirectory from './pages/ObjectDirectory';
import { useEffect, useState } from 'react';

function App() {
  return ( 
    <> 
      <Router> 
        <Routes> 
          <Route path="/Home" element={<Home />} /> 
          <Route path="/Object/:objectId" element={<ObjectDirectory />} />
        </Routes> 
      </Router> 
    </> 
  );
}

export default App;
