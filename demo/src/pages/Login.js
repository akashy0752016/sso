import React from "react";
import { useEffect, useState } from "react";
import configData from "../config.json";
import { Navigate } from "react-router-dom";
import { checkIsLoggedIn } from "../components/utils/Middleware";
const Login = () => {
    let user = checkIsLoggedIn();
    useEffect(() => {
        document.title = configData.title+ " | Login"
    }, []);
    
    function loginWithGitHub() {
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + configData['git-hub-client-id']);
    }
    return user ? <Navigate to={"/"} /> 
        : 
        <>
            <main>
                <div className="container">

                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                        <div className="d-flex justify-content-center py-4">
                            <a href="index.html" className="logo d-flex align-items-center w-auto">
                            <img src="./img/logo.png" alt="" />
                            <span className="d-none d-lg-block">{configData.title}</span>
                            </a>
                        </div>

                        <div className="card mb-3">

                            <div className="card-body">

                            <div className="pt-4 pb-2">
                                <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                            </div>

                            <form className="row g-3 needs-validation" noValidate>

                                <div className="col-12">
                                <button className="btn btn-primary w-100" type="button" onClick={loginWithGitHub}>Login</button>
                                </div>
                            </form>

                            </div>
                        </div>

                        </div>
                    </div>
                    </div>

                </section>

                </div>
            </main>
        </>
};
 
export default Login;