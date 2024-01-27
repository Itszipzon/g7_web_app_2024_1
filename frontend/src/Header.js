import { Link } from "react-router-dom";

function Header() {
    return(
        <div className="Header">
            <Link to="/test" className="testLink" >
                <div>Test</div>
            </Link>
        </div>
    );
}

export default Header;