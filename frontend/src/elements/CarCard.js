import { Link } from "react-router-dom";

import "./css/CarCard.css";

function CarCard({
	style = {},
	className = "",
	src = "",
	name = "Car Name",
	body = "Car type",
	fuel = "Diesel",
	transmission = "Manual",
	seats = "5",
	price = "60,-",
	link = "/card"
}) {
	return (
		<div className="CarCard" style={style}>
			<Link to={link} className={"carCardLink " + className}>
				<h1>{name}</h1>
				<p>{body}</p>
				<div className="CarCardImgHolder">
					<div className="carcardOverlay">
						<img src={src} alt={name}></img>
					</div>
				</div>
				<div className="CarCardInfoHolder">
					<div className="CarCardInfo">
						<div className="CarCardInfoSvg">
							<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M21.34 7.33L19.34 6.33C18.97 6.15 18.51 6.29 18.33 6.66C18.14 7.04 18.29 7.49 18.66 7.67L20.25 8.46V13.25L16.5 13.26V3C16.5 1 15.16 0 13.5 0H5.5C3.84 0 2.5 1 2.5 3V19.25H1C0.59 19.25 0.25 19.59 0.25 20C0.25 20.41 0.59 20.75 1 20.75H18C18.41 20.75 18.75 20.41 18.75 20C18.75 19.59 18.41 19.25 18 19.25H16.5V14.76L21 14.75C21.42 14.75 21.75 14.41 21.75 14V8C21.75 7.72 21.59 7.46 21.34 7.33ZM5 4.89C5 3.5 5.85 3 6.89 3H12.12C13.15 3 14 3.5 14 4.89V6.12C14 7.5 13.15 8 12.11 8H6.89C5.85 8 5 7.5 5 6.11V4.89ZM5.5 10.25H8.5C8.91 10.25 9.25 10.59 9.25 11C9.25 11.41 8.91 11.75 8.5 11.75H5.5C5.09 11.75 4.75 11.41 4.75 11C4.75 10.59 5.09 10.25 5.5 10.25Z" fill="#90A3BF" />
							</svg>

							<p>{fuel}</p>
						</div>
						<div className="CarCardInfoSvg">
							<svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M370.513 874.855c-48.815-20.02-92.685-50.082-129.215-87.716-69.276-71.384-112.122-170.011-112.122-278.945 0-108.918 42.846-207.544 112.122-278.929 69.836-71.953 170.267-107.93 270.706-107.93 100.423 0 200.861 35.977 270.688 107.93 69.276 71.384 112.131 170.01 112.131 278.929 0 108.934-42.855 207.561-112.131 278.945-36.52 37.633-80.399 67.694-129.205 87.716-45.187 18.524-93.334 27.811-141.483 27.811-48.166 0-96.298-9.288-141.491-27.811l0 0zM512.005 199.998c-80.213 0-160.425 28.732-216.19 86.211-33.202 34.203-58.802 76.253-73.97 123.216-4.189 15.772 1.398 23.218 16.742 22.364 50.317-1.991 158.745-3.58 181.017-4.735-19.13 22.356-30.724 51.706-30.724 83.843 0 35.031 13.779 66.757 36.06 89.716 7.949 8.2 16.994 15.277 26.875 20.983 18.62 10.778 39.397 16.165 60.19 16.174 20.785-0.008 41.563-5.396 60.181-16.174 9.881-5.707 18.919-12.783 26.875-20.983 22.281-22.959 36.06-54.684 36.06-89.716 0-32.136-11.603-61.488-30.716-83.843 22.263 1.155 130.691 2.744 181.001 4.735 15.345 0.853 20.94-6.593 16.742-22.364-15.159-46.962-40.762-89.012-73.971-123.216-55.764-57.48-135.968-86.211-216.174-86.211l0 0zM581.084 439.837c-35.645-36.729-102.534-36.729-138.178 0-17.676 18.215-28.613 43.389-28.613 71.185 0 27.811 10.937 52.978 28.613 71.199 6.813 7.011 14.615 13.002 23.19 17.704 28.483 15.645 63.324 15.645 91.808 0 8.566-4.702 16.377-10.694 23.182-17.704 17.684-18.222 28.62-43.389 28.62-71.199 0.001-27.794-10.936-52.969-28.62-71.185l0 0zM529.738 548.203c13.365-6.761 22.564-20.933 22.564-37.307 0-17.353-10.337-32.221-25.008-38.428-9.71-4.108-20.875-4.108-30.586 0-14.672 6.208-25.008 21.076-25.008 38.428 0 16.373 9.191 30.546 22.555 37.307 11.074 5.588 24.423 5.588 35.483 0l0 0zM575.449 817.192c58.964-12.818 111.669-43.147 152.728-85.459 42.896-44.2 73.092-101.47 84.509-165.509 4.109-17.369-3.143-22.69-15.848-22.272-25.626-0.56-51.261-0.452-75.691 4.293-87.041 16.909-118.171 60.19-133.574 159.829-5.595 36.193-9.151 78.547-12.123 109.118l0 0zM448.541 817.192c-2.963-30.572-6.528-72.925-12.114-109.118-15.404-99.638-46.54-142.919-133.583-159.829-24.423-4.745-50.065-4.853-75.691-4.293-12.699-0.418-19.957 4.902-15.841 22.272 11.408 64.039 41.614 121.309 84.501 165.509 41.068 42.312 93.764 72.64 152.728 85.459z" fill="#90A3BF" /></svg>



							<p>{transmission}</p>
						</div>
						<div className="CarCardInfoSvg">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z" fill="#90A3BF" />
								<path d="M14.08 14.15C11.29 12.29 6.73996 12.29 3.92996 14.15C2.65996 15 1.95996 16.15 1.95996 17.38C1.95996 18.61 2.65996 19.75 3.91996 20.59C5.31996 21.53 7.15996 22 8.99996 22C10.84 22 12.68 21.53 14.08 20.59C15.34 19.74 16.04 18.6 16.04 17.36C16.03 16.13 15.34 14.99 14.08 14.15Z" fill="#90A3BF" />
								<path d="M19.99 7.33999C20.15 9.27999 18.77 10.98 16.86 11.21C16.85 11.21 16.85 11.21 16.84 11.21H16.81C16.75 11.21 16.69 11.21 16.64 11.23C15.67 11.28 14.78 10.97 14.11 10.4C15.14 9.47999 15.73 8.09999 15.61 6.59999C15.54 5.78999 15.26 5.04999 14.84 4.41999C15.22 4.22999 15.66 4.10999 16.11 4.06999C18.07 3.89999 19.82 5.35999 19.99 7.33999Z" fill="#90A3BF" />
								<path d="M21.99 16.59C21.91 17.56 21.29 18.4 20.25 18.97C19.25 19.52 17.99 19.78 16.74 19.75C17.46 19.1 17.88 18.29 17.96 17.43C18.06 16.19 17.47 15 16.29 14.05C15.62 13.52 14.84 13.1 13.99 12.79C16.2 12.15 18.98 12.58 20.69 13.96C21.61 14.7 22.08 15.63 21.99 16.59Z" fill="#90A3BF" />
							</svg>

							<p>{seats} seats</p>
						</div>
					</div>
				</div>
			</Link>

			<div className="recommendedPrice">
				<div className="recommendedPriceText">
					<h2>{price},-/</h2>
					<p>day</p>
				</div>
				<div className="recommendedButtonContainer">
					<div className="recommendedButton">Rent Now</div>
				</div>
			</div>
		</div>
	);
}

export default CarCard;