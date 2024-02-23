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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.53 2 12 2Z" fill="#90A3BF" />
                <rect x="4" y="4" width="16" height="16" rx="8" fill="white" />
                <path d="M12 6C8.688 6 6 8.688 6 12C6 15.312 8.688 18 12 18C15.312 18 18 15.312 18 12C18 8.688 15.318 6 12 6Z" fill="#90A3BF" />
                <rect x="8" y="8" width="8" height="8" rx="4" fill="white" />
                <rect x="11" y="17" width="2" height="4" fill="#90A3BF" />
                <rect x="17" y="11" width="4" height="2" fill="#90A3BF" />
                <rect x="3" y="11" width="4" height="2" fill="#90A3BF" />
              </svg>

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