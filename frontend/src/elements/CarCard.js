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
        <div className="CarCardInfo">
          <div className="CarCardInfoSvg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="100%"
              height="100%"
              viewBox="0 0 14 14"
              id="svg2">
              <defs
                id="defs6" />
              <rect
                width="14"
                height="14"
                x="0"
                y="0"
                id="canvas"
                fill="none" />
              <path
                d="m 10.78125,0 -0.625,0.71875 1.1875,1.09375 c 0.03621,0.036212 0.0856,0.084693 0.125,0.125 l -0.25,0.28125 C 10.818532,2.6189681 11.105689,3.1369332 11.25,3.28125 L 12,4.03125 12,10 c 0,1 -0.392136,1 -0.5,1 C 11.392136,11 11,11 11,10 L 11,6 C 11,4.7190916 10,4 9,4 L 9,2 C 9,1.4486964 8.575273,1 8,1 L 2,1 C 1.400757,1 1,1.4247267 1,2 l 0,12 8,0 0,-9 c 0,0 1,0 1,1 l 0,4 c 0,2 1.239698,2 1.5,2 0.275652,0 1.5,0 1.5,-2 L 13,3 C 13,2 12.713983,1.7907839 12.375,1.46875 L 10.78125,0 z M 2,3 8,3 8,6 2,6 2,3 z"
                id="fuel"
                fill="#90A3BF" />
            </svg>
            <p>{fuel}</p>
          </div>
          <div className="CarCardInfoSvg">
            <svg width="800px" height="800px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" fill="white" fillOpacity="0.01" />
              <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#90A3BF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M24 44V32" stroke="#90A3BF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 24H16" stroke="#90A3BF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M44 24H32" stroke="#90A3BF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M32 24C32 28.4183 28.4183 32 24 32C19.5817 32 16 28.4183 16 24C16 19.5817 19.5817 16 24 16C28.4183 16 32 19.5817 32 24Z" stroke="#90A3BF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>{transmission}</p>
          </div>
          <div className="CarCardInfoSvg">
            <svg fill="#90A3BF" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
              width="800px" height="800px" viewBox="0 0 96.979 96.979">
              <g>
                <g>
                  <path d="M59.07,46.021L59.07,46.021c4.576-3.373,7.31-8.754,7.31-14.393c0-9.863-8.025-17.889-17.89-17.889
			c-9.864,0-17.889,8.025-17.889,17.889c0,5.717,2.66,10.959,7.297,14.385c-18.244,6.451-21.092,28.71-21.531,35.378
			c-0.031,0.479,0.137,0.949,0.465,1.3c0.328,0.35,0.785,0.549,1.264,0.549h60.788c0.479,0,0.938-0.199,1.266-0.549
			c0.328-0.351,0.496-0.82,0.465-1.3C80.175,74.736,77.32,52.511,59.07,46.021z"/>
                  <path d="M82.761,46.861c3.02-2.227,4.821-5.779,4.821-9.502c0-6.508-5.297-11.805-11.807-11.805c-1.867,0-3.627,0.447-5.199,1.223
			c0.345,1.564,0.529,3.184,0.529,4.852c0,4.68-1.484,9.219-4.137,12.988c10.448,6.572,14.981,18.07,16.944,26.81h11.923
			c0.315,0,0.618-0.131,0.836-0.361c0.215-0.23,0.325-0.541,0.305-0.857C96.688,65.812,94.805,51.144,82.761,46.861z"/>
                  <path d="M29.976,44.617c-2.654-3.748-4.104-8.238-4.104-12.988c0-1.668,0.188-3.287,0.531-4.852
			c-1.572-0.775-3.332-1.223-5.199-1.223c-6.51,0-11.807,5.297-11.807,11.805c0,3.775,1.754,7.236,4.816,9.496
			C2.172,51.113,0.291,65.806,0.002,70.207c-0.021,0.316,0.09,0.627,0.307,0.857c0.217,0.229,0.52,0.36,0.836,0.36H13.06
			C15.019,62.685,19.543,51.179,29.976,44.617z"/>
                </g>
              </g>
            </svg>
            <p>{seats}</p>
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