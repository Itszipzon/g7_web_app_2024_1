import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return(
        <div className="Header">
            <Link to="/" className="headerLink" >
                <div>Home</div>
            </Link>
            <Link to="/test" className="headerLink" >
                <div>Test</div>
            </Link>
        </div>
    );
}

export default Header;