import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {

	const serverData = require('./information.json');

	return (
		<div className="Footer">
			<div className="footerContainer">
				<div className="footerLogo">
					<img className="footerLogo" src={serverData.serverAddress + "api/image/logo.png"} alt="Logo"></img>
				</div>
				<div className="footerCompany">
					<h3>Company</h3>
					<Link to="/" className="footerLink"><p>About Us</p></Link>
					<Link to="/" className="footerLink"><p>Our Team</p></Link>
					<Link to="/" className="footerLink"><p>Careers</p></Link>
					<Link to="/" className="footerLink"><p>Privacy Policy</p></Link>
				</div>
				<div className="footerFeatures">
					<h3>Features</h3>
					<Link to="/" className="footerLink"><p>New way of shopping</p></Link>
					<Link to="/" className="footerLink"><p>Win prices</p></Link>
					<Link to="/" className="footerLink"><p>Donate while shopping</p></Link>
				</div>
				<div className="footerContact">
					<h3>Contact</h3>
					<Link to="/" className="footerLink"><p>Twitter</p></Link>
					<Link to="/" className="footerLink"><p>Instagram</p></Link>
					<Link to="/" className="footerLink"><p>Linkedin</p></Link>
					<Link to="/" className="footerLink"><p>Email</p></Link>
				</div>
				<div className="footerNewsletter">
					<h3>Subscribe to our newsletter</h3>
					<div className="footerNewsletterInputContainer">

						<input type="text" placeholder="Email address"></input>
						<div className="footerNewsletterButton">Subscribe</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Footer;