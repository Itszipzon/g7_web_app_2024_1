import { Link } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import axios from "axios";
import getUrl from './backend';

function Header() {

    const [logo, setLogo] = useState(null);

    useEffect(() => {
        axios.get(getUrl() + "test/image/logo.png").then((e) => {
            setLogo(e.data);
        });
    }, []);

    return (
        <div className="Header">
            <div className="headerContainer">
                {logo && <img src={getUrl() + "test/image/logo.png"} alt="logo" className="headerLogo" />}
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
    );
}

export default Header;