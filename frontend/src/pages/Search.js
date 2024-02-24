import { useEffect, useState } from 'react';
import './css/Search.css';
import { useNavigate } from 'react-router';
import CarCard from '../elements/CarCard';

function Search() {

	const [priceMinRangeValue, setPriceMinRangeValue] = useState(0);
	const [priceMaxRangeValue, setPriceMaxRangeValue] = useState(0);

	const handlePriceMinRangeChange = (e) => {
		setPriceMinRangeValue(e.target.value);
		if (e.target.value > priceMaxRangeValue) {
			setPriceMaxRangeValue(e.target.value);
		}
	}

	const handlePriceMaxRangeChange = (e) => {
		setPriceMaxRangeValue(e.target.value);
		if (e.target.value < priceMinRangeValue) {
			setPriceMinRangeValue(e.target.value);
		}
	}

	return (
		<div className="searchPage">
			<div className="navSideBar">
				<div className="navSideSearch">
					<h1>Type</h1>

					<div className="checkBox">
						<input type="checkbox" name="Sport" value="2" />
						<label for="Sport">Sport</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input type="checkbox" name="SUV" value="2" />
						<label for="SUV">SUV</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input type="checkbox" name="Station wagon" value="2" />
						<label for="Stationwagon">Station wagon</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input type="checkbox" name="Sedan" value="2" />
						<label for="Sedan">Sedan</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input type="checkbox" name="Coupe" value="2" />
						<label for="Coupe">Coupe</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input type="checkbox" name="Hatchback" value="2" />
						<label for="Hatchback">Hatchback</label>
						<label>(10)</label>
					</div>

					<h1 style={{ "marginTop": "50px" }}>Capacity</h1>

					<div className="checkBox">
						<input type="checkbox" name="2 persons" value="2" />
						<label for="2 persons">2 persons</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input type="checkbox" name="4 persons" value="2" />
						<label for="4 persons">4 persons</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input type="checkbox" name="5 persons" value="2" />
						<label for="5 persons">5 persons</label>
						<label>(10)</label>
					</div>
					<div className="checkBox">
						<input type="checkbox" name="6+ persons" value="2" />
						<label for="6+ persons">6+ persons</label>
						<label>(10)</label>
					</div>

					<h1 style={{ "marginTop": "50px" }}>Price</h1>
					<div className="inputRangeHolder">
						<input onChange={handlePriceMinRangeChange} type='range' min='0' max='100000' step='25' value={priceMinRangeValue} id='priceRange' />
						<input onChange={handlePriceMaxRangeChange} type='range' min='0' max='100000' step='25' value={priceMaxRangeValue} id='priceRange' />
					</div>
					<div className='priceRangeInputContainer'>
						<label>Min:</label>
						<input type='number' value={priceMinRangeValue} className='priceRangeInput' onChange={handlePriceMinRangeChange} />
						<label>Max:</label>
						<input type='number' value={priceMaxRangeValue} className='priceRangeInput' onChange={handlePriceMaxRangeChange} />
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