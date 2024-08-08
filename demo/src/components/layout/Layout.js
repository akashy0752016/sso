import React,{useEffect} from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import Footer from "../common/Footer";

const Layout = ({ children }) => {
    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
           // localStorage.removeItem('accessToken'); 
            window.location.href="/"
        }
    },[])
    return (
        <>
            <Header />
            <Sidebar />
            {children}
            <Footer />
        </>
    )
};
  
export default Layout
