import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";
import axios from "axios";
import CarCard from "../elements/CarCard";

function Home() {

	const locationRef = useRef(null);

	const [popularCar, setPopularCar] = useState([1, 2, 3, 4]);

	const [locationinputMarked, setLocationinputMarked] = useState(false);
	const [locationsearchItems, setLocationsearchItems] = useState([]);
	const [locationValue, setLocationValue] = useState("");
	const [locationSelected, setLocationSelected] = useState(0);
	const [locationDb, setLocationDb] = useState([]);

	const [dateFrom, setDateFrom] = useState("");
	const [dateTo, setDateTo] = useState("");

	const jsonValue = require("../information.json");

	const [readMore, setReadMore] = useState(false);

	const handleLocationInputFocus = () => {
		setLocationSelected(0);
		setLocationinputMarked(true);
	}

	const handleLocationInputBlur = () => {
		setTimeout(() => {
			setLocationinputMarked(false);
		}, 130);
	}

	const handleLocationClick = (val) => {
		setLocationValue(val);
	}


	useEffect(() => {
			axios.get(jsonValue.serverAddress + "api/search/location/").then(response => {
				const locationsParsed = response.data.map(l => JSON.parse(l));
				setLocationDb(locationsParsed);
			});
	}, [jsonValue]);

	useEffect(() => {
		setLocationsearchItems(locationDb);
	}, [locationDb]);

	const scrollIfNeeded = (listRef, index) => {
		if (listRef.current && index >= 0) {
			const listBoxHeight = listRef.current.offsetHeight;
			const listItemHeight = listRef.current.children[0].offsetHeight;

			const scrollAmount = index * listItemHeight - listBoxHeight / 2;
			listRef.current.parentElement.scrollTop = scrollAmount;
		}
	}

	const handleButtonPress = (e) => {
		if (e.key === "Enter") {
			if (locationinputMarked) {
				handleLocationInputBlur();
				handleLocationClick(locationsearchItems[locationSelected].LocationName);
			}

		} else if (e.key === "ArrowDown") {
			if (locationinputMarked) {
				if (locationSelected < locationsearchItems.length - 1) {
					scrollIfNeeded(locationRef, locationSelected + 1);
					setLocationSelected(locationSelected + 1);
				}

			}
		} else if (e.key === "ArrowUp") {
			if (locationinputMarked) {
				if (locationSelected > 0) {
					scrollIfNeeded(locationRef, locationSelected - 1);
					setLocationSelected(locationSelected - 1);
				}
			}
		}
	}

	useEffect(() => {
		document.addEventListener("keydown", handleButtonPress);
		return (() => {
			document.removeEventListener("keydown", handleButtonPress);
		});
	});

	var validLocation = [];

	const handleLocationSearchInputChange = (e) => {
		handleLocationInputFocus();
		setLocationSelected(0);
		let searchTerm = e.target.value;
		let validItemCounter = 0;
		validLocation = [];
		for (let i = 0; i < locationDb.length; i++) {
			if (locationDb[i].LocationName.toLowerCase().includes(searchTerm.toLowerCase())) {
				validLocation[validItemCounter] = locationDb[i];
				validItemCounter++;
			}
		}
		validLocation.sort((a, b) => customSort(a.LocationName, b.LocationName, searchTerm));
		setLocationsearchItems(validLocation);
		setLocationValue(searchTerm);
	}

	const handleDateFromInputChange = (e) => {
		setDateFrom(e.target.value);
	}

	const handleDateToInputChange = (e) => {
		setDateTo(e.target.value);
	}

	const handleSearchButtonClick = () => {
		window.location.href = "/search?location=" + locationValue + "&dateFrom=" + dateFrom + "&dateTo=" + dateTo;
	}

	const handleReadMore = () => {
		setReadMore(!readMore);
	}

	return (
		<div className="Home">
			<div className="homeContainer">
				<h1>Compare car deals to find the right one.</h1>
				<div className="searchForCarContainer">
					<div>
						<div className="locationDiv">
							<input type="text" placeholder="Location" value={locationValue} onFocus={handleLocationInputFocus} onBlur={handleLocationInputBlur} onChange={handleLocationSearchInputChange} />

						</div>
						<div className="searchContentContainer" style={locationinputMarked ? { "display": "flex" } : { "display": "none" }}>
							<ul className="searchContentHomeUl" ref={locationRef}>
								{locationsearchItems.map((item, index) =>
									<li className={"searchContentHomeLi " + ((index === locationSelected) ? "liSelected" : "")} key={item.LocationAddress} onClick={() => {
										handleLocationClick(item.LocationName);
									}} >
										<div className="searchHomeNameContainer">
											<div className="searchHomeLocationContainer">
												<div className="searchHomeLocationContainerTop">
													{item.LocationName}
												</div>
												<div className="searchHomeLocationContainerMid">
													{item.LocationAddress}
												</div>
											</div>
										</div>
									</li>
								)}
							</ul>
						</div>

					</div>
					<div className="searchDateContainer">
						<label htmlFor="date">From</label><br />
						<input type="date" placeholder="From" onChange={handleDateFromInputChange} value={dateFrom} />
					</div>
					<div className="searchDateContainer">
						<label htmlFor="date">To</label><br />
						<input type="date" placeholder="To" onChange={handleDateToInputChange} value={dateTo} />
					</div>

					<div className="searchButtonContainer">
						<div className="searchButton" onClick={handleSearchButtonClick}>Search</div>
					</div>
				</div>
				<div className="homePopularContainer">
					<div className="homePopularTitle">Popular cars</div>
					<div className="homePopularContent">
						{popularCar.map((item) => {
							return (
								<div className="CarCards" key={item}>
									<CarCard
										src={jsonValue.serverAddress + "api/car/img/" + item}
										name="VolksWagen Golf"
										body="Hatchback"
										fuel="Diesel"
										transmission="Manual"
										seats="5"
										price="550"
										link="/"
									/>
								</div>
							);
						})}
					</div>

				</div>
				<div className="homeBodyContainer">
					<div className="homeBodyContentContainer">
						<Link to="/search?body=suv" className="bodyLink">
							<div className="bodyLinkContent">
								<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
									width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
									preserveAspectRatio="xMidYMid meet">

									<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
										fill="#2c81c8" stroke="none">
										<path d="M229 1385 c-22 -12 -129 -172 -151 -228 -9 -20 -38 -254 -38 -300 0
-18 11 -39 29 -58 25 -24 37 -29 80 -29 l51 0 0 43 c1 132 126 247 270 247
144 0 257 -100 276 -244 l7 -46 303 0 304 0 0 43 c0 87 70 185 160 226 94 43
222 21 299 -52 41 -39 81 -120 81 -164 0 -43 24 -44 46 -1 34 65 -6 243 -69
305 -32 32 -33 33 -227 56 l-195 23 -128 87 c-70 47 -144 91 -165 97 -23 6
-202 10 -472 10 -355 -1 -440 -3 -461 -15z m351 -121 l0 -56 -62 7 c-74 8 -98
26 -98 72 l0 33 80 0 80 0 0 -56z m300 -15 l0 -71 -55 6 c-30 3 -80 9 -110 12
l-55 6 0 59 0 59 110 0 110 0 0 -71z m274 57 c28 -12 163 -102 190 -127 6 -5
-5 -14 -25 -23 -29 -12 -55 -12 -179 0 -80 7 -155 13 -167 14 -22 0 -23 4 -23
75 l0 75 85 0 c50 0 99 -6 119 -14z"/>
										<path d="M400 977 c-49 -16 -107 -77 -120 -129 -40 -147 102 -285 245 -238 47
16 104 66 121 107 18 41 18 115 0 156 -26 64 -114 119 -186 116 -14 -1 -41 -6
-60 -12z"/>
										<path d="M1556 976 c-139 -52 -170 -233 -57 -329 126 -106 314 -17 314 149 0
132 -133 226 -257 180z"/>
									</g>
								</svg>
								<p>SUV</p>
							</div>
						</Link>
						<Link to="/search?body=hatchback" className="bodyLink">
							<div className="bodyLinkContent">
								<svg
									fill="#2c81c8"
									width="800px"
									height="800px"
									viewBox="0 -39.69 122.88 122.88"
									id="Layer_1"
									xmlns="http://www.w3.org/2000/svg"
									xmlnsXlink="http://www.w3.org/1999/xlink"
									style={{
										enableBackground: "new 0 0 122.88 43.49",
										transform: "scaleX(-1)",
									}}
									xmlSpace="preserve"
								>
									<style type="text/css">
										{"\n    .st0{fill-rule:evenodd;clip-rule:evenodd;}\n  "}
									</style>
									<g>
										<path
											className="st0"
											d="M103.94,23.97c5.39,0,9.76,4.37,9.76,9.76c0,5.39-4.37,9.76-9.76,9.76c-5.39,0-9.76-4.37-9.76-9.76 C94.18,28.34,98.55,23.97,103.94,23.97L103.94,23.97z M23,29.07v3.51h3.51C26.09,30.86,24.73,29.49,23,29.07L23,29.07z M26.52,34.87H23v3.51C24.73,37.97,26.09,36.6,26.52,34.87L26.52,34.87z M20.71,38.39v-3.51H17.2 C17.62,36.6,18.99,37.96,20.71,38.39L20.71,38.39z M17.2,32.59h3.51v-3.51C18.99,29.49,17.62,30.86,17.2,32.59L17.2,32.59z M105.09,29.07v3.51h3.51C108.18,30.86,106.82,29.49,105.09,29.07L105.09,29.07z M108.6,34.87h-3.51v3.51 C106.82,37.97,108.18,36.6,108.6,34.87L108.6,34.87z M102.8,38.39v-3.51h-3.51C99.71,36.6,101.07,37.96,102.8,38.39L102.8,38.39z M99.28,32.59h3.51v-3.51C101.07,29.49,99.71,30.86,99.28,32.59L99.28,32.59z M49.29,12.79c-1.54-0.35-3.07-0.35-4.61-0.28 C56.73,6.18,61.46,2.07,75.57,2.9l-1.94,12.87L50.4,16.65c0.21-0.61,0.33-0.94,0.37-1.55C50.88,13.36,50.86,13.15,49.29,12.79 L49.29,12.79z M79.12,3.13L76.6,15.6l24.13-0.98c2.48-0.1,2.91-1.19,1.41-3.28c-0.68-0.95-1.44-1.89-2.31-2.82 C93.59,1.86,87.38,3.24,79.12,3.13L79.12,3.13z M0.46,27.28H1.2c0.46-2.04,1.37-3.88,2.71-5.53c2.94-3.66,4.28-3.2,8.65-3.99 l24.46-4.61c5.43-3.86,11.98-7.3,19.97-10.2C64.4,0.25,69.63-0.01,77.56,0c4.54,0.01,9.14,0.28,13.81,0.84 c2.37,0.15,4.69,0.47,6.97,0.93c2.73,0.55,5.41,1.31,8.04,2.21l9.8,5.66c2.89,1.67,3.51,3.62,3.88,6.81l1.38,11.78h1.43v6.51 c-0.2,2.19-1.06,2.52-2.88,2.52h-2.37c0.92-20.59-28.05-24.11-27.42,1.63H34.76c3.73-17.75-14.17-23.91-22.96-13.76 c-2.67,3.09-3.6,7.31-3.36,12.3H2.03c-0.51-0.24-0.91-0.57-1.21-0.98c-1.05-1.43-0.82-5.74-0.74-8.23 C0.09,27.55-0.12,27.28,0.46,27.28L0.46,27.28z M21.86,23.97c5.39,0,9.76,4.37,9.76,9.76c0,5.39-4.37,9.76-9.76,9.76 c-5.39,0-9.76-4.37-9.76-9.76C12.1,28.34,16.47,23.97,21.86,23.97L21.86,23.97z"
										/>
									</g>
								</svg>
								<p>Hatchback</p>
							</div>
						</Link>
						<Link to="/search?body=station wagon" className="bodyLink">
							<div className="bodyLinkContent">
								<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
									width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
									preserveAspectRatio="xMidYMid meet">

									<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
										fill="#2c81c8" stroke="none">
										<path d="M298 1283 l-98 -4 -20 -38 c-29 -59 -60 -179 -60 -238 0 -29 -4 -53
-10 -53 -14 0 -13 -43 2 -58 7 -7 22 -12 34 -12 12 0 28 -9 35 -19 12 -16 31
-21 120 -26 l107 -7 11 34 c28 84 124 123 194 79 33 -20 67 -73 67 -103 0 -12
38 -16 218 -21 119 -4 290 -7 380 -7 l162 0 0 28 c1 93 115 153 197 102 32
-19 63 -66 63 -95 0 -18 2 -18 70 -5 112 21 130 29 130 55 0 13 -8 29 -19 34
-11 6 -21 26 -25 50 -4 27 -14 46 -30 56 -31 21 -145 42 -333 61 l-156 16 -88
78 c-83 73 -91 78 -146 83 -74 8 -676 16 -805 10z m362 -55 c0 -7 -6 -35 -13
-63 l-13 -50 -227 -3 c-146 -1 -227 1 -227 8 0 14 31 93 43 108 7 9 64 12 223
12 165 0 214 -3 214 -12z m270 -59 l0 -72 -61 7 c-34 3 -91 6 -126 6 -57 0
-64 2 -59 18 3 9 10 36 16 59 12 48 15 50 143 52 l87 1 0 -71z m233 32 c16
-14 42 -43 59 -63 l30 -38 -131 0 c-148 0 -133 -10 -146 94 l-7 48 84 -7 c70
-6 87 -11 111 -34z"/>
										<path d="M483 920 c-22 -13 -36 -32 -44 -61 -11 -37 -11 -46 7 -78 27 -50 82
-77 129 -61 19 6 46 25 61 43 22 26 25 38 21 76 -10 87 -97 128 -174 81z m127
-50 c19 -35 12 -77 -16 -99 -35 -28 -69 -26 -99 4 -41 40 -32 99 18 120 36 15
82 3 97 -25z"/>
										<path d="M1494 906 c-84 -84 -8 -217 106 -186 50 14 80 54 80 110 0 34 -6 48
-34 76 -28 28 -42 34 -76 34 -34 0 -48 -6 -76 -34z m125 -19 c40 -33 32 -104
-15 -126 -36 -16 -57 -14 -82 9 -74 69 18 180 97 117z"/>
									</g>
								</svg>
								<p>Station Wagon</p>
							</div>
						</Link>
						<Link to="/search?body=van" className="bodyLink">
							<div className="bodyLinkContent">
								<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
									width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
									preserveAspectRatio="xMidYMid meet">

									<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
										fill="#2c81c8" stroke="none">
										<path d="M81 1452 c-26 -25 -29 -36 -34 -122 -14 -211 -13 -275 5 -293 22 -22
35 -141 18 -162 -7 -8 -18 -15 -25 -15 -9 0 -14 -23 -18 -72 -6 -91 8 -108 87
-108 l52 0 12 47 c22 81 106 143 192 143 65 -1 162 -77 176 -138 3 -15 7 -33
10 -39 5 -19 883 -19 888 0 3 6 7 24 10 39 14 61 111 137 176 138 86 0 170
-62 192 -143 l12 -47 52 0 c79 0 94 17 86 104 -7 67 -8 70 -38 78 -38 10 -79
52 -70 73 5 13 15 15 51 9 l45 -6 0 54 c0 30 -6 62 -14 73 -8 11 -87 45 -197
85 l-183 65 -61 78 c-37 48 -83 93 -118 118 -105 70 -95 69 -720 69 l-559 0
-27 -28z m1212 -60 c70 -31 112 -67 157 -134 59 -88 59 -88 -181 -88 l-199 0
0 126 0 127 88 -5 c58 -4 104 -12 135 -26z m-110 -286 c9 -22 -14 -36 -59 -36
-45 0 -60 11 -50 35 7 20 102 21 109 1z"/>
										<path d="M291 818 c-110 -59 -110 -221 -1 -279 109 -59 239 29 228 153 -12
117 -126 180 -227 126z m99 -49 c0 -16 -20 -49 -29 -49 -7 0 -31 43 -31 55 0
3 14 5 30 5 17 0 30 -5 30 -11z m-82 -31 c7 -7 12 -20 12 -30 0 -13 -8 -18
-30 -18 -34 0 -34 0 -18 35 13 28 19 30 36 13z m142 -7 c16 -32 12 -41 -20
-41 -16 0 -30 5 -30 11 0 16 20 49 30 49 5 0 14 -9 20 -19z m-130 -90 c0 -10
-6 -24 -14 -30 -11 -10 -17 -7 -30 11 -22 32 -20 38 14 38 23 0 30 -5 30 -19z
m140 6 c0 -7 -7 -22 -15 -33 -15 -19 -15 -19 -30 0 -23 31 -18 46 15 46 18 0
30 -5 30 -13z m-80 -36 c16 -32 12 -41 -20 -41 -33 0 -37 9 -18 40 16 25 25
25 38 1z"/>
										<path d="M1590 833 c-101 -38 -140 -174 -73 -253 72 -86 188 -80 257 13 29 39
27 122 -4 172 -35 56 -123 89 -180 68z m80 -58 c0 -12 -24 -55 -31 -55 -9 0
-29 33 -29 49 0 6 14 11 30 11 17 0 30 -2 30 -5z m-80 -45 c14 -26 5 -40 -26
-40 -26 0 -30 11 -14 41 14 24 27 24 40 -1z m138 -5 c16 -35 16 -35 -18 -35
-22 0 -30 5 -30 18 0 18 18 42 30 42 4 0 12 -11 18 -25z m-128 -78 c0 -7 -7
-22 -15 -33 -15 -19 -15 -19 -30 0 -23 31 -18 46 15 46 18 0 30 -5 30 -13z
m140 5 c0 -4 -7 -18 -16 -30 -13 -18 -19 -21 -30 -11 -8 6 -14 20 -14 30 0 14
7 19 30 19 17 0 30 -3 30 -8z m-82 -47 c16 -35 16 -35 -18 -35 -32 0 -36 9
-20 41 14 26 25 24 38 -6z"/>
									</g>
								</svg>
								<p>Van</p>
							</div>
						</Link>
						<Link to="/search?body=sedan" className="bodyLink">
							<div className="bodyLinkContent">
								<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
									width="200.000000pt" height="200.000000pt" viewBox="0 0 860.000000 364.000000"
									preserveAspectRatio="xMidYMid meet">

									<g transform="translate(0.000000,364.000000) scale(0.100000,-0.100000)"
										fill="#2c81c8" stroke="none">
										<path d="M3535 3234 c-16 -2 -165 -8 -329 -14 -314 -11 -561 -31 -707 -55
-196 -33 -456 -137 -1132 -452 l-269 -125 -211 -14 c-321 -21 -408 -31 -425
-48 -25 -25 -31 -98 -38 -440 l-7 -328 -43 -64 c-59 -87 -69 -128 -68 -264 1
-105 3 -122 32 -191 17 -42 38 -118 46 -169 9 -51 18 -96 22 -99 3 -3 120 -7
259 -9 l253 -3 11 50 c14 67 50 146 106 232 119 184 282 300 493 350 72 18
108 20 212 16 205 -8 338 -63 491 -206 148 -137 218 -265 263 -481 l12 -55
1582 -3 c870 -1 1582 0 1582 3 0 3 9 49 21 103 80 378 404 644 784 643 205 0
379 -70 532 -214 135 -128 212 -263 249 -435 l17 -82 459 0 458 0 0 105 c0
105 15 165 41 165 5 0 22 25 36 56 31 67 40 178 24 281 -15 96 -26 118 -75
147 -23 13 -56 42 -73 64 -58 72 -315 215 -576 321 -378 153 -765 252 -1179
301 -92 10 -178 25 -190 31 -13 7 -91 58 -174 114 -535 361 -985 587 -1352
679 -186 47 -280 57 -722 81 -270 14 -346 16 -415 9z m550 -234 c287 -24 522
-72 649 -133 174 -84 339 -254 440 -456 43 -85 40 -97 -36 -112 -24 -5 -328
-6 -684 -2 l-641 6 -7 66 c-3 36 -6 191 -6 343 0 253 1 278 18 287 22 13 115
13 267 1z m-455 -355 l0 -355 -557 1 c-524 1 -713 6 -728 20 -3 4 5 35 18 70
26 69 235 561 241 566 2 2 42 10 89 19 129 22 300 31 635 33 l302 1 0 -355z
m-1215 268 c-14 -59 -247 -599 -262 -610 -12 -10 -70 -13 -207 -13 -244 1
-296 11 -281 59 20 63 237 272 397 382 121 83 330 209 347 209 9 0 11 -8 6
-27z"/>
										<path d="M6355 1419 c-33 -5 -98 -27 -144 -49 -164 -79 -289 -239 -327 -420
-30 -139 -3 -303 69 -430 90 -159 269 -274 458 -295 72 -8 215 10 283 36 129
48 262 172 329 308 l42 84 3 155 c3 140 1 161 -19 216 -64 178 -250 350 -414
384 -77 16 -214 22 -280 11z m303 -238 c188 -96 266 -305 191 -507 -41 -108
-122 -185 -240 -224 -86 -29 -230 -25 -300 9 -157 76 -261 264 -231 422 22
118 84 215 179 280 73 51 107 59 228 56 102 -3 115 -5 173 -36z"/>
										<path d="M6373 1112 c-131 -47 -203 -150 -203 -292 0 -55 6 -78 31 -128 16
-34 45 -73 62 -88 46 -39 124 -72 188 -80 110 -13 231 49 294 150 28 47 30 55
30 150 0 92 -2 105 -27 147 -74 126 -241 189 -375 141z"/>
										<path d="M1481 1396 c-247 -94 -416 -352 -397 -607 25 -352 328 -604 670 -560
324 42 536 278 536 596 0 177 -50 297 -173 420 -65 65 -100 91 -171 126 l-89
44 -156 3 c-144 2 -161 0 -220 -22z m324 -188 c103 -26 205 -112 253 -216 24
-51 27 -69 27 -163 0 -101 -1 -108 -38 -181 -69 -140 -174 -208 -333 -216
-188 -9 -310 62 -388 227 -28 60 -31 75 -31 166 0 91 3 106 31 165 91 189 270
271 479 218z"/>
										<path d="M1605 1119 c-99 -28 -191 -119 -216 -212 -15 -56 -6 -153 19 -209 26
-58 91 -124 151 -151 66 -31 187 -30 256 1 65 30 128 93 157 156 33 75 32 183
-4 251 -68 131 -229 204 -363 164z"/>
									</g>
								</svg>
								<p>Sedan</p>
							</div>
						</Link>
						<Link to="/search" className="bodyLink">
							<div className="bodyLinkContent">
								<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
									width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
									preserveAspectRatio="xMidYMid meet">

									<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
										fill="#2c81c8" stroke="none">
										<path d="M2160 3427 l0 -367 -894 0 -894 0 -17 -49 c-22 -66 -13 -101 26 -101
l29 0 0 -160 0 -160 -35 0 -35 0 0 -79 c0 -75 3 -84 59 -202 32 -68 77 -168
101 -221 l43 -98 142 0 142 0 -13 52 c-18 69 -18 200 1 271 46 179 186 328
363 389 94 32 249 32 342 -1 262 -91 421 -362 366 -621 -9 -41 -16 -78 -16
-82 0 -5 369 -8 819 -8 l819 0 -15 51 c-22 74 -14 244 15 324 113 310 469 451
764 303 238 -119 344 -361 283 -645 l-7 -33 106 0 107 0 79 78 c55 54 88 97
107 138 l28 59 -1 230 c0 213 -2 238 -27 345 -15 63 -32 119 -39 126 -38 35
-539 128 -908 169 l-145 16 -24 -28 -24 -28 -21 29 c-79 110 -196 247 -290
342 -123 123 -312 269 -366 283 -53 14 -370 31 -687 38 l-283 6 0 -366z m984
164 c89 -67 204 -181 284 -280 73 -91 172 -232 172 -245 0 -3 -242 -6 -539 -6
l-539 0 -6 238 c-4 130 -9 261 -12 291 l-6 54 298 -7 298 -6 50 -39z m-340
-716 c8 -9 13 -22 9 -31 -4 -12 -26 -14 -127 -12 -109 3 -121 5 -124 22 -6 29
16 36 125 36 78 0 105 -4 117 -15z m1901 -76 c88 -7 170 -16 181 -20 19 -7 23
-18 29 -89 4 -45 5 -83 3 -85 -2 -2 -101 20 -219 50 -233 60 -249 68 -249 132
l0 36 48 -6 c26 -3 119 -11 207 -18z"/>
										<path d="M1240 2633 c-14 -2 -56 -20 -95 -38 -119 -57 -217 -175 -250 -300
-57 -220 46 -440 253 -543 75 -37 77 -37 196 -37 144 0 198 18 291 92 117 95
178 221 178 368 0 189 -102 344 -280 427 -58 28 -78 32 -167 34 -56 1 -112 0
-126 -3z"/>
										<path d="M3920 2633 c-14 -2 -56 -20 -95 -38 -242 -115 -334 -400 -210 -646
37 -72 129 -157 215 -198 73 -35 78 -36 195 -36 117 0 122 1 195 36 123 58
208 154 251 281 17 52 20 81 17 163 -3 90 -7 108 -39 175 -48 100 -129 181
-228 228 -67 32 -82 36 -175 38 -55 1 -112 0 -126 -3z"/>
									</g>
								</svg>
								<p>???</p>
							</div>
						</Link>
						<Link to="/search" className="bodyLink">
							<div className="bodyLinkContent">
								<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
									width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
									preserveAspectRatio="xMidYMid meet">

									<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
										fill="#2c81c8" stroke="none">
										<path d="M820 1244 c-114 -11 -391 -48 -553 -75 -97 -16 -179 -29 -182 -29 -2
0 3 -16 11 -36 20 -48 15 -89 -11 -89 -32 0 -30 -33 5 -65 30 -28 113 -65 172
-77 23 -4 28 -2 28 13 0 30 37 82 72 104 90 55 218 -14 220 -117 l0 -40 91 -7
c49 -3 235 -6 411 -6 l322 0 -4 38 c-6 75 51 140 130 149 89 10 160 -53 162
-143 l1 -44 114 0 113 0 -16 25 c-16 25 -16 28 4 59 l20 34 -42 32 c-92 67
-238 120 -336 120 -27 0 -64 11 -100 29 -167 84 -455 141 -632 125z m255 -59
c147 -24 352 -95 338 -117 -10 -17 -274 -2 -478 28 -99 14 -220 29 -270 33
l-90 7 35 15 c42 19 96 36 130 42 60 10 253 6 335 -8z"/>
										<path d="M369 973 c-89 -55 -73 -198 25 -231 85 -28 166 29 166 116 -1 26 -6
57 -14 70 -31 57 -121 80 -177 45z m111 -63 c24 -24 26 -67 3 -92 -20 -22 -70
-23 -95 -1 -40 36 -8 113 47 113 14 0 34 -9 45 -20z"/>
										<path d="M1459 951 c-33 -32 -39 -45 -39 -80 0 -49 20 -92 52 -113 77 -50 175
-14 199 74 8 32 6 46 -10 82 -23 52 -61 76 -122 76 -35 0 -48 -6 -80 -39z
m129 -37 c15 -10 22 -25 22 -46 0 -42 -25 -68 -66 -68 -57 0 -85 69 -44 110
24 24 57 26 88 4z"/>
									</g>
								</svg>
								<p>???</p>
							</div>
						</Link>
						<Link to="/search?body=others" className="bodyLink">
							<div className="bodyLinkContent">
								<div className="bodyLinkImageContainer" />
								<p className="bodyothers">Others</p>
							</div>
						</Link>
					</div>
				</div>
				<div className="homeAboutUs">
					<h1>About Us</h1>
					{
						readMore ?
							<p>Welcome to Rental Roulette, where your journey begins with a spin of the wheel and ends with the perfect ride tailored just for you. At Rental Roulette, we've revolutionized the car rental experience by aggregating prices from a myriad of trusted third-party car rental companies. No more hopping from site to site in search of the best deal – our platform puts the power back in your hands. Whether you're embarking on a spontaneous road trip, planning a family vacation, or simply need a reliable set of wheels for your daily commute, Rental Roulette ensures that you're always in the driver's seat when it comes to choice and affordability.
								<br /><br />Our commitment extends beyond just providing competitive prices; we prioritize transparency, convenience, and a touch of excitement. With our user-friendly interface, you can effortlessly compare options, finding the ideal vehicle to suit your preferences and budget. Say goodbye to hidden fees and hello to a seamless rental experience. At Rental Roulette, we believe that every journey should begin with a sense of adventure, and our platform is designed to add an element of thrill to the otherwise mundane task of renting a car. Join us in the pursuit of hassle-free, cost-effective, and enjoyable travels – where every rental is a winning spin!
								<br /><br />Nestled in the picturesque landscapes of Ålesund, Rental Roulette takes pride in catering specifically to the vibrant community of this stunning coastal town. Our focus is on providing tailored car rental solutions by aggregating prices exclusively from rental companies in the Ålesund area. Whether you're exploring the fjords, embarking on a scenic coastal drive, or simply navigating the charming streets of Ålesund itself, Rental Roulette ensures that your local car rental experience is not only convenient but also intimately connected to the unique beauty of this Norwegian gem. Embrace the essence of Ålesund with us, where every rental is a seamless blend of convenience and local charm.</p>
							:
							<p>Welcome to Rental Roulette, where your journey begins with a spin of the wheel and ends with the perfect ride tailored just for you. At Rental Roulette, we've revolutionized the car rental experience by aggregating prices from a myriad of trusted third-party car rental companies. No more hopping from site to site in search of the best deal – our platform puts the power back in your hands. Whether you're embarking on a spontaneous road trip, planning a family vacation, or simply need a reliable set of wheels for your daily commute, Rental Roulette ensures that you're always in the driver's seat when it comes to choice and affordability.</p>
					}
					<div>
						<div onClick={handleReadMore} className="homeAboutUsReadMore">{readMore ? "Show Less" : "Show More"}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;

/**
 * Sorts your list with the startwords matching first, then alphabetical.
 * @param {*} a 
 * @param {*} b 
 * @param {*} searchString The search word.
 * @returns sorted list.
 */
function customSort(a, b, searchString) {
	if (a.startsWith(searchString) && !b.startsWith(searchString)) {
		return -1;
	} else if (!a.startsWith(searchString) && b.startsWith(searchString)) {
		return 1;
	} else {
		return a.localeCompare(b);
	}
}