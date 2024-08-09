import React from "react";
import ConfigJson from "../../config.json";

const githubData = ConfigJson.data;
const Sidebar = () => {
    return (
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">
            
            <li className="nav-item">
                <a className="nav-link " data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-layout-text-window-reverse"></i><span>Directory</span><i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="tables-nav" className="nav-content collapse show" data-bs-parent="#sidebar-nav">
                
                {githubData.map((gh, i)=>(
                    <li>
                        <a href={ window.location.origin + "/object/" +gh.id }>
                        <i className="bi bi-circle"></i><span>{ gh.title }</span>
                        </a>
                    </li>
                ))}
                </ul>
            </li>

            </ul>

        </aside>
    );
};

export default Sidebar;
