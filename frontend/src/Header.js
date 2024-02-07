import { Link } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Header() {

    const [logo, setLogo] = useState(null);

    const jsonData = require("./information.json");

    useEffect(() => {
        axios.get(jsonData.serverAddress + "test/image/logo.png").then((e) => {
            setLogo(e.data);
        });
    }, []);

    return (
        <div className="Header">
            <div className="headerContainer">
                <div className="headerContent">
                    <Link to="/">
                        {logo && 
                            <div className="logoContainer">
                                <p>Rental</p>
                                <img src={jsonData.serverAddress + "test/image/logo.png"} alt="logo" className="headerLogo" />
                                <p>Roulette</p>
                            </div>}
                    </Link>
                    <div className="headerLinks">
                        <Link to="/" className="headerLink" >
                            <div>Home</div>
                        </Link>
                        <Link to="/test" className="headerLink" >
                            <div>Test</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;