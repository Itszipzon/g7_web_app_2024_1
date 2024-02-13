import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Header() {

    const [logo, setLogo] = useState(null);
    const [activeHeader, setActiveHeader] = useState("");
    const location = useLocation();

    const jsonData = require("./information.json");

    useEffect(() => {
        axios.get(jsonData.serverAddress + "api/image/logo.png").then((e) => {
            setLogo(e.data);
        });
    }, [jsonData.serverAddress]);

    useEffect(() => {
        setActiveHeader(window.location.pathname);
    }, [location]);

    return (
        <div className="Header">
            <div className="headerContainer">
                <div className="headerContent">
                    <Link to="/">
                        {logo &&
                            <div className="logoContainer">
                                <p className="headerLogoName">Rental</p>
                                <img src={jsonData.serverAddress + "api/image/logo.png"} alt="logo" className="headerLogo" />
                                <p className="headerLogoName">Roulette</p>
                            </div>}
                    </Link>
                    <div className="headerLinks">
                        <Link to="/" className={"headerLink " + (activeHeader === "/" ? 'headerLinkActive' : '')}>
                            <div>Home</div>
                        </Link>
                        <Link to="/test" className={"headerLink " + (activeHeader.includes("/test") ? 'headerLinkActive' : '')}>
                            <div>Test</div>
                        </Link>
                        <Link to="/testcar" className={"headerLink " + (activeHeader.includes("/test") ? 'headerLinkActive' : '')}>
                            <div>Test Car</div>
                        </Link>
                    </div>
                    <Link to="/">
                        <div className="headerLogin">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7zM9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7"/></svg>Login
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;