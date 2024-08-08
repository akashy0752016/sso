import React from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import Footer from "../common/Footer";

const Layout = ({ children }) => {
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
