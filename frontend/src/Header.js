import { Link, useActionData } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Header() {

    const [logo, setLogo] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/test/image/logo.png").then((e) => {
            setLogo(e.data);
        });
    }, []);

    return(
        <div className="Header">
            <Link to="/" className="headerLink" >
                <div>Home</div>
            </Link>
            <Link to="/test" className="headerLink" >
                <div>Test</div>
            </Link>
            {logo && <img src="http://localhost:8080/test/image/logo.png" alt="logo" className="headerLogo"/>}
        </div>
    );
}

export default Header;