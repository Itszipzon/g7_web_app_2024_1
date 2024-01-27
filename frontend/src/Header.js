import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return(
        <div className="Header">
            <Link to="/" className="testLink" >
                <div>Home</div>
            </Link>
            <Link to="/test" className="testLink" >
                <div>Test</div>
            </Link>
        </div>
    );
}

export default Header;