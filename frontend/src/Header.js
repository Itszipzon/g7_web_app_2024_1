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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;