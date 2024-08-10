import { React, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkIsLoggedIn, getAccessToken } from "../components/utils/Middleware";
const Callback = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    const [navigate, setNavigate] = useState({});
    getAccessToken(codeParam);
    useEffect(() => {
        setTimeout(() => {
            if(checkIsLoggedIn()) {
                setNavigate("/")
            } else {
                localStorage.removeItem('accessToken'); 
                localStorage.removeItem('userName'); 
                localStorage.removeItem('avatar_url'); 
                localStorage.removeItem('html_url'); 
                setNavigate("/login")
            }
        }, 3000);
        
    });
    return <Navigate to={navigate} />
};

export default Callback;