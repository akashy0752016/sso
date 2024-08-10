import React from "react";

const Header = () => {
    function signOut() {
        localStorage.removeItem('accessToken'); 
        localStorage.removeItem('userName'); 
        localStorage.removeItem('avatar_url'); 
        localStorage.removeItem('html_url'); 
        window.location.href = "http://localhost:3000/login";
    }

    return (
    <header id="header" className="header fixed-top d-flex align-items-center">

        <div className="d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
            <img src="assets/img/logo-1.png" alt="" />
            <span className="d-none d-lg-block">Object Directory</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn"></i>
        </div>

        

        <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">

            <li className="nav-item dropdown pe-3">

            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <img src={ localStorage.getItem('avatar_url') } alt="Profile" className="rounded-circle" />
                            <span className="d-none d-md-block dropdown-toggle ps-2">{localStorage.getItem('userName')}</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                <h6>{localStorage.getItem('userName')}</h6>
                </li>
                <li>
                <hr className="dropdown-divider" />
                </li>

                <li>
                <a className="dropdown-item d-flex align-items-center" target="_blank" rel="noreferrer" href={localStorage.getItem('html_url')}>
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                </a>
                </li>
                <li>
                <hr className="dropdown-divider" />
                </li>
                <li>
                <a className="dropdown-item d-flex align-items-center" href="#" onClick={signOut}>
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                </a>
                </li>

            </ul>
            </li>

        </ul>
        </nav>

    </header>
    );
};

export default Header;
