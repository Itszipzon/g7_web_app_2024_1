import { useEffect, useState } from 'react';
import './css/Search.css';
import { useNavigate } from 'react-router';
import CarCard from '../elements/CarCard';

function Search() {

	const [maker, setMaker] = useState('');
	const [model, setModel] = useState('');
	const [year , setYear] = useState('');
	const [body, setBody] = useState('');
	const [fuel, setFuel] = useState('');
	const [transmission, setTransmission] = useState('');
	const [seats, setSeats] = useState('');
	const [priceFrom, setPriceFrom] = useState('');
	const [priceTo, setPriceTo] = useState('');
	const [location, setLocation] = useState('');
	const [dateFrom, setDateFrom] = useState('');
	const [dateTo, setDateTo] = useState('');

	const navigate = useNavigate();

	const handleNavigate = () => {
		let navigateString = "/search?";
		if (maker !== '') {
			navigateString += "maker=" + maker + "&";
		}
		if (model !== '') {
			navigateString += "model=" + model + "&";
		}
		if (year !== '') {
			navigateString += "year=" + year + "&";
		}
		if (body !== '') {
			navigateString += "body=" + body + "&";
		}
		if (fuel !== '') {
			navigateString += "fuel=" + fuel + "&";
		}
		if (transmission !== '') {
			navigateString += "transmission=" + transmission + "&";
		}
		if (seats !== '') {
			navigateString += "seats=" + seats + "&";
		}
		if (priceFrom !== '') {
			navigateString += "pricefrom=" + priceFrom + "&";
		}
		if (priceTo !== '') {
			navigateString += "priceto=" + priceTo + "&";
		}
		if (location !== '') {
			navigateString += "location=" + location + "&";
		}
		if (dateFrom !== '') {
			navigateString += "datefrom=" + dateFrom + "&";
		}
		if (dateTo !== '') {
			navigateString += "dateto=" + dateTo + "&";
		}
		navigateString = navigateString.substring(0, navigateString.length - 1);
		navigate(navigateString);
	}

	const handleSeatsChange = (e) => {
		let seatsList = seats.split(',');
		var trueValue = "";
		if (seatsList.length > 0) {
			if (seatsList.includes(e.target.value)) {
				seatsList = seatsList.filter(item => item !== e.target.value);
			} else {
				seatsList.push(e.target.value);
			}
		} else {
			seatsList.push(e.target.value);
		}

		if (seatsList.join(',').charAt(0) === ',') {
			trueValue = seatsList.join(',').substring(1);
		} else {
			trueValue = seatsList.join(',');
		}
		setSeats(trueValue);
	}
	

	const handlePriceMinRangeChange = (e) => {
		setPriceFrom(e.target.value);
	}

	const handlePriceMaxRangeChange = (e) => {
		setPriceTo(e.target.value);
	}

	useEffect(() => {
		handleNavigate();
	}, [maker, model, year, body, fuel, transmission, seats, priceFrom, priceTo, location, dateFrom, dateTo]);

	return (
		<div className="searchPage">
			<div className="navSideBar">
				<div className="navSideSearch">
					<h1 style={{"marginTop" : "38px"}}>Type</h1>

					<div className="checkBox">
						<input type="checkbox" name="Sport" value="sport" />
						<label htmlFor="Sport">Sport</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input type="checkbox" name="SUV" value="suv" />
						<label htmlFor="SUV">SUV</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input type="checkbox" name="Station wagon" value="station wagon" />
						<label htmlFor="Stationwagon">Station wagon</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input type="checkbox" name="Sedan" value="sedan" />
						<label htmlFor="Sedan">Sedan</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input type="checkbox" name="Coupe" value="coupe" />
						<label htmlFor="Coupe">Coupe</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input type="checkbox" name="Hatchback" value="hatchback" />
						<label htmlFor="Hatchback">Hatchback</label>
						<label>(10)</label>
					</div>

					<h1 style={{ "marginTop": "50px" }}>Capacity</h1>

					<div className="checkBox">
						<input onChange={handleSeatsChange} type="checkbox" name="2 persons" value="2" />
						<label htmlFor="2 persons">2 Seats</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input onChange={handleSeatsChange} type="checkbox" name="4 persons" value="4" />
						<label htmlFor="4 persons">4 Seats</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input onChange={handleSeatsChange} type="checkbox" name="5 persons" value="5" />
						<label htmlFor="5 persons">5 Seats</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input onChange={handleSeatsChange} type="checkbox" name="6+ persons" value="6" />
						<label htmlFor="6+ persons">6+ Seats</label>
						<label>(10)</label>
					</div>

					<h1 style={{ "marginTop": "50px" }}>Price</h1>
					<div className="inputRangeHolder">
						<input onChange={handlePriceMinRangeChange} type='range' min='0' max='100000' step='25' value={priceFrom} id='priceRange' />
						<input onChange={handlePriceMaxRangeChange} type='range' min='0' max='100000' step='25' value={priceTo} id='priceRange' />
					</div>
					<div className='priceRangeInputContainer'>
						<label>Min:</label>
						<input type='number' value={priceFrom} className='priceRangeInput' onChange={handlePriceMinRangeChange} />
						<label>Max:</label>
						<input type='number' value={priceTo} className='priceRangeInput' onChange={handlePriceMaxRangeChange} />
					</div>

				</div>

				<div className="navMap">
					<h1>MAP</h1>
				</div>

			</div>

			<div className="searchCarTitle">Our Selection</div>
			<div className="searchPageContainer">
				<div className="searchCarContainer">
					<div className="searchCarContent">
						<div className='carCardHolder'>
							<CarCard key={"a"}
								style={{ "Height": "390px", "Width": "280px" }}
								src={""}
								name="VolksWagen Golf"
								body="Hatchback"
								fuel="Diesel"
								year="2007"
								transmission="Manual"
								seats="5"
								price="550"
								link="/"
							/>
						</div>
						<div className='carCardHolder'>
							<CarCard key={"a"}
								style={{ "Height": "390px", "Width": "280px" }}
								src={""}
								name="VolksWagen Golf"
								body="Hatchback"
								fuel="Diesel"
								year="2007"
								transmission="Manual"
								seats="5"
								price="550"
								link="/"
							/>
						</div>
						<div className='carCardHolder'>
							<CarCard key={"a"}
								style={{ "Height": "390px", "Width": "280px" }}
								src={""}
								name="VolksWagen Golf"
								body="Hatchback"
								fuel="Diesel"
								year="2007"
								transmission="Manual"
								seats="5"
								price="550"
								link="/"
							/>
						</div>
						<div className='carCardHolder'>
							<CarCard key={"a"}
								style={{ "Height": "390px", "Width": "280px" }}
								src={""}
								name="VolksWagen Golf"
								body="Hatchback"
								fuel="Diesel"
								year="2007"
								transmission="Manual"
								seats="5"
								price="550"
								link="/"
							/>
						</div>
						<div className='carCardHolder'>
							<CarCard key={"a"}
								style={{ "Height": "390px", "Width": "280px" }}
								src={""}
								name="VolksWagen Golf"
								body="Hatchback"
								fuel="Diesel"
								year="2007"
								transmission="Manual"
								seats="5"
								price="550"
								link="/"
							/>
						</div>
						<div className='carCardHolder'>
							<CarCard key={"a"}
								style={{ "Height": "390px", "Width": "280px" }}
								src={""}
								name="VolksWagen Golf"
								body="Hatchback"
								fuel="Diesel"
								year="2007"
								transmission="Manual"
								seats="5"
								price="550"
								link="/"
							/>
						</div>
						<div className='carCardHolder'>
							<CarCard key={"a"}
								style={{ "Height": "390px", "Width": "280px" }}
								src={""}
								name="VolksWagen Golf"
								body="Hatchback"
								fuel="Diesel"
								year="2007"
								transmission="Manual"
								seats="5"
								price="550"
								link="/"
							/>
						</div>
						<div className='carCardHolder'>
							<CarCard key={"a"}
								style={{ "Height": "390px", "Width": "280px" }}
								src={""}
								name="VolksWagen Golf"
								body="Hatchback"
								fuel="Diesel"
								year="2007"
								transmission="Manual"
								seats="5"
								price="550"
								link="/"
							/>
						</div>
						<div className='carCardHolder'>
							<CarCard key={"a"}
								style={{ "Height": "390px", "Width": "280px" }}
								src={""}
								name="VolksWagen Golf"
								body="Hatchback"
								fuel="Diesel"
								year="2007"
								transmission="Manual"
								seats="5"
								price="550"
								link="/"
							/>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}

export default Search;