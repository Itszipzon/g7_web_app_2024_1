import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import axios from "axios";
import UserMenuNav from "./elements/UserMenuNav";

function Header() {

	const [logo, setLogo] = useState(null);
	const [activeHeader, setActiveHeader] = useState("");
	const location = useLocation();

	const [showUserMenu, setShowUserMenu] = useState(false);

	const [name, setName] = useState("");
	const [inSession, setInSession] = useState(false);
	const [admin, setAdmin] = useState(false);

	const jsonData = require("./information.json");

	useEffect(() => {
		axios.get(jsonData.serverAddress + "api/image/logo.png").then((e) => {
			setLogo(e.data);
		});
	}, [jsonData]);

	useEffect(() => {
		setActiveHeader(window.location.pathname);
		setShowUserMenu(false);
	}, [location]);

	useEffect(() => {
		axios.get(jsonData.serverAddress + "api/get/user/values/" + localStorage.getItem("UIDtoken")).then((e) => {
			setInSession(true);
		})
			.catch((e) => {
				setInSession(false);
				setName("");
			});
	}, [location, jsonData])

	useEffect(() => {
		if (!inSession) {
			axios.get(jsonData.serverAddress + "api/get/user/values/" + localStorage.getItem("UIDtoken")).then((r) => {
				if (r.status === 200) {
					console.log(r.data)
					setName(r.data.Name);
					setAdmin(r.data.IsAdmin);
					setInSession(true);
				} else {
					setInSession(false);
				}
			})
			.catch(
				setInSession(false)
			);
		}

	}, [jsonData, inSession]);

	const handleShowUserMenu = () => {
		setShowUserMenu(!showUserMenu);
	}

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
							</div>
						}
					</Link>
					<div className="headerLinks">
						<Link to="/" className={"headerLink " + (activeHeader === "/" ? 'headerLinkActive' : '')}>
							<div>Home</div>
						</Link>
						<Link to="/search" className={"headerLink " + (activeHeader.includes("/search") ? 'headerLinkActive' : '')}>
							<div>Search</div>
						</Link>
					</div>
					{inSession ?
						<div className="headerUserSessionContainer">
							<div className="headerLogin" onClick={handleShowUserMenu}>
								<svg width="56" height="56" viewBox="0 0 49 56" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M41.213 44.7123C41.7744 44.5795 42.11 43.9992 41.9034 43.4607C40.739 40.4263 38.5792 37.7559 35.686 35.7961C32.4769 33.6222 28.545 32.4438 24.5 32.4438C20.455 32.4438 16.5231 33.6222 13.314 35.7961C10.4208 37.7559 8.26096 40.4263 7.09658 43.4607C6.88993 43.9992 7.22562 44.5795 7.78694 44.7123L15.292 46.4876C21.3471 47.92 27.6529 47.92 33.708 46.4876L41.213 44.7123Z" fill="#2C81C8" />
									<ellipse cx="24.5" cy="18.5394" rx="10.2083" ry="11.5871" fill="#2C81C8" />
								</svg>
							</div>
							<div className="headerUserSessionList" style={showUserMenu ? { display: "flex" } : { display: "none" }}>
								<UserMenuNav isadmin={admin} name={name} />
							</div>
						</div>
						:
						<Link className="headerUserIcon" to="/login">
							<div className="headerLogin">
								<svg width="56" height="56" viewBox="0 0 49 56" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M41.213 44.7123C41.7744 44.5795 42.11 43.9992 41.9034 43.4607C40.739 40.4263 38.5792 37.7559 35.686 35.7961C32.4769 33.6222 28.545 32.4438 24.5 32.4438C20.455 32.4438 16.5231 33.6222 13.314 35.7961C10.4208 37.7559 8.26096 40.4263 7.09658 43.4607C6.88993 43.9992 7.22562 44.5795 7.78694 44.7123L15.292 46.4876C21.3471 47.92 27.6529 47.92 33.708 46.4876L41.213 44.7123Z" fill="#2C81C8" />
									<ellipse cx="24.5" cy="18.5394" rx="10.2083" ry="11.5871" fill="#2C81C8" />
								</svg>
							</div>
						</Link>
					}
				</div>
			</div>
		</div>
	);
}

export default Header;