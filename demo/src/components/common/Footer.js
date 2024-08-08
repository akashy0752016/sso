import { React, useEffect } from "react";
import ReactDOM from 'react-dom/client';

const footer = ReactDOM.createRoot(document.getElementById('footer'));

const Footer = () => {
    useEffect(() => {
        document.getElementById("footer").classList.add('footer');
    }, []);
    footer.render(
        <>
        <div className="copyright">&copy; Copyright <strong><span>PACCAR INC.</span></strong>. All Rights Reserved</div>
        </>
    );
    return (
        <>
        </>
    );
};

export default Footer;
