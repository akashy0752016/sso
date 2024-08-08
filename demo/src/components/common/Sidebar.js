import React from "react";
 
const Sidebar = () => {
    return (
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

            <li className="nav-item">
                <a className="nav-link " data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-layout-text-window-reverse"></i><span>Directory</span><i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="tables-nav" className="nav-content collapse show" data-bs-parent="#sidebar-nav">
                <li>
                    <a href="./object/1" className="active">
                    <i className="bi bi-circle"></i><span>General Tables</span>
                    </a>
                </li>
                <li>
                    <a href="./object/2">
                    <i className="bi bi-circle"></i><span>Data Tables</span>
                    </a>
                </li>
                </ul>
            </li>

            </ul>

        </aside>
    );
};

export default Sidebar;
