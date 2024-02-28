import { useEffect, useState } from 'react';
import './css/Search.css';
import CarCard from '../elements/CarCard';
import axios from 'axios';

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
	const [orderBy, setOrderBy] = useState('');
	const [order, setOrder] = useState('');

	const [cars, setCars] = useState([]);

	const jsonValue = require('../information.json');

	useEffect(() => {
		const handleURLChange = () => {
			const urlSearchParams = new URLSearchParams(window.location.search);
			setMaker(urlSearchParams.get('maker') || '');
			setModel(urlSearchParams.get('model') || '');
			setYear(urlSearchParams.get('year') || '');
			setBody(urlSearchParams.get('body') || '');
			setFuel(urlSearchParams.get('fuel') || '');
			setTransmission(urlSearchParams.get('transmission') || '');
			setSeats(urlSearchParams.get('seats') || '');
			setPriceFrom(urlSearchParams.get('priceFrom') || '');
			setPriceTo(urlSearchParams.get('priceTo') || '');
			setLocation(urlSearchParams.get('location') || '');
			setDateFrom(urlSearchParams.get('dateFrom') || '');
			setDateTo(urlSearchParams.get('dateTo') || '');
			setOrderBy(urlSearchParams.get('orderBy') || '');
			setOrder(urlSearchParams.get('order') || '');
			setParamsInitialized(true);

		};
	
		handleURLChange();
		window.addEventListener('popstate', handleURLChange);
	
		return () => {
			window.removeEventListener('popstate', handleURLChange);
		};
	}, []);
	
	const [paramsInitialized, setParamsInitialized] = useState(false);
	
	useEffect(() => {
		if (paramsInitialized) {
			fetchData();
		}
	}, [paramsInitialized]);
	
	const fetchData = () => {
		const urlParams = new URLSearchParams();
		if (maker) urlParams.set('maker', maker);
		if (model) urlParams.set('model', model);
		if (year) urlParams.set('year', year);
		if (body) urlParams.set('body', body);
		if (fuel) urlParams.set('fuel', fuel);
		if (transmission) urlParams.set('transmission', transmission);
		if (seats) urlParams.set('seats', seats);
		if (priceFrom) urlParams.set('priceFrom', priceFrom);
		if (priceTo) urlParams.set('priceTo', priceTo);
		if (location) urlParams.set('location', location);
		if (dateFrom) urlParams.set('dateFrom', dateFrom);
		if (dateTo) urlParams.set('dateTo', dateTo);
		if (orderBy) urlParams.set('orderBy', orderBy);
		if (order) urlParams.set('order', order);
	
		const queryParams = urlParams.toString();
	
		axios.get(jsonValue.serverAddress + 'api/car/filters?' + queryParams)
			.then((response) => {
				const carsParsed = response.data.map((c) => JSON.parse(c));
				setCars(carsParsed);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	};

	const handleSeatsChange = (e) => {
		let seatsList = seats.split(',');
		const value = e.target.value;
	
		if (seatsList.includes(value)) {
			seatsList = seatsList.filter(item => item !== value);
		} else {
			seatsList.push(value);
		}
	
		let trueValue = seatsList.join(',');
		if (trueValue.charAt(0) === ',') {
			trueValue = trueValue.substring(1);
		}
		setSeats(trueValue);
		updateURLParams({ seats: trueValue });
	};

  const handlePriceMinRangeChange = (e) => {
    const value = e.target.value;
    setPriceFrom(value);
    updateURLParams({ priceFrom: value });
  };

  const handlePriceMaxRangeChange = (e) => {
    const value = e.target.value;
    setPriceTo(value);
    updateURLParams({ priceTo: value });
  };

  const updateURLParams = (paramsToUpdate) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    Object.keys(paramsToUpdate).forEach(param => {
      if (paramsToUpdate[param] === '') {
        urlSearchParams.delete(param);
      } else {
        urlSearchParams.set(param, paramsToUpdate[param]);
      }
    });
    const newURL = `${window.location.pathname}?${urlSearchParams.toString()}`;
    window.history.pushState({}, '', newURL);
  };

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
						<input onChange={handleSeatsChange} checked={seats.includes('2')} type="checkbox" name="2 persons" value="2" />
						<label htmlFor="2 persons">2 Seats</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input onChange={handleSeatsChange} checked={seats.includes('4')} type="checkbox" name="4 persons" value="4" />
						<label htmlFor="4 persons">4 Seats</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input onChange={handleSeatsChange} checked={seats.includes('5')} type="checkbox" name="5 persons" value="5" />
						<label htmlFor="5 persons">5 Seats</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input onChange={handleSeatsChange} checked={seats.includes('6')} type="checkbox" name="6+ persons" value="6" />
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
						{cars.map((car, index) => {
							return (
								<div className='carCardHolder' key={index + "" + car.Maker}>
							<CarCard
								style={{ "Height": "390px", "Width": "280px" }}
								src={jsonValue.serverAddress + 'api/car/img/' + car.ID}
								name={car.Maker + ' ' + car.Model}
								body={car.Body}
								fuel={car.Fuel}
								year={car.Year}
								transmission={car.Transmission}
								seats={car.Seats}
								price={car.Price}
								link={"/car/" + car.ID}
							/>
						</div>
							)
						})}

					</div>
				</div>
			</div>
		</div>
	);
}

export default Search;