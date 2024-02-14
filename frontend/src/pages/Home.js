import { useEffect, useRef, useState } from "react";
import "./css/Home.css";
import axios from "axios";

function Home() {

    const carNameRef = useRef(null);
    const locationRef = useRef(null);

    const [carinputMarked, setCarinputMarked] = useState(false);
    const [carsearchItems, setCarsearchItems] = useState([]);
    const [carNameValue, setCarNameValue] = useState("");
    const [carSelected, setCarSelected] = useState(0);
    const [carDb, setCarDb] = useState([]);

    const [locationinputMarked, setLocationinputMarked] = useState(false);
    const [locationsearchItems, setLocationsearchItems] = useState([]);
    const [locationValue, setLocationValue] = useState("");
    const [locationSelected, setLocationSelected] = useState(0);
    const [locationDb, setLocationDb] = useState([]);

    const [isValidCar, setIsValidCar] = useState(false);

    const [date, setDate] = useState("");

    const [emptyFieldMessage, setEmptyFieldMessage] = useState("");

    const jsonValue = require("../information.json");

    const handleCarNameInputFocus = () => {
        setCarSelected(0);
        setCarinputMarked(true);
    }

    const handleCarNameInputBlur = () => {
        setTimeout(() => {
            setCarinputMarked(false);
        }, 130);
    }


    const handleCarNameClick = (e) => {
        handleCarNameSearchInputChange({ target: { value: e } });
        
        axios.get(jsonValue.serverAddress + "api/search/location/" + e).then(response => {
            const locationsParsed = response.data.map(l => JSON.parse(l));
            setLocationDb(locationsParsed);
        });
    }

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
        axios.get(jsonValue.serverAddress + "api/search/car/" + val).then(response => {
            const carsParsed = response.data.map(c => JSON.parse(c));
            setCarDb(carsParsed);
        });
    }

    let validCarNames = [];

    useEffect(() => {
        if (!carNameValue) {
            axios.get(jsonValue.serverAddress + "api/search/location/" + carNameValue).then(response => {
                const locationsParsed = response.data.map(l => JSON.parse(l));
                setLocationDb(locationsParsed);
            });
        }
    }, [carNameValue, jsonValue]);

    useEffect(() => {
        if (!locationValue) {
            axios.get(jsonValue.serverAddress + "api/search/car/" + locationValue).then(response => {
                const carsParsed = response.data.map(c => JSON.parse(c));
                setCarDb(carsParsed);
            });
        }
    }, [locationValue, jsonValue]);

    useEffect(() => {
        setLocationsearchItems(locationDb);
        setCarsearchItems(carDb);
    }, [carDb, locationDb]);


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
            if (carinputMarked) {
                handleCarNameInputBlur();
                handleCarNameClick(carsearchItems[carSelected].Maker + " " + carsearchItems[carSelected].Model);
            } else if (locationinputMarked) {
                handleLocationInputBlur();
                handleLocationClick(locationsearchItems[locationSelected].LocationName);
            }

        } else if (e.key === "ArrowDown") {
            if (carinputMarked) {
                if (carSelected < carsearchItems.length - 1) {
                    scrollIfNeeded(carNameRef, carSelected + 1);
                    setCarSelected(carSelected + 1);
                }
            } else if (locationinputMarked) {
                if (locationSelected < locationsearchItems.length - 1) {
                    scrollIfNeeded(locationRef, locationSelected + 1);
                    setLocationSelected(locationSelected + 1);
                }

            }
        } else if (e.key === "ArrowUp") {
            if (carinputMarked) {
                if (carSelected > 0) {
                    scrollIfNeeded(carNameRef, carSelected - 1);
                    setCarSelected(carSelected - 1);
                }

            } else if (locationinputMarked) {
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

    const handleCarNameSearchInputChange = (e) => {
        handleCarNameInputFocus();
        setLocationSelected(0);
        let searchTerm = e.target.value;
        let validItemCounter = 0;
        validCarNames = [];
        for (let i = 0; i < carDb.length; i++) {
            if ((carDb[i].Maker + " " + carDb[i].Model).toLowerCase().includes(searchTerm.toLowerCase())) {
                validCarNames[validItemCounter] = carDb[i];
                validItemCounter++;
            }
        }
        validCarNames.sort((a, b) => customSort((a.Maker + " " + a.Model), (b.Maker + " " + b.Model), searchTerm));
        setCarsearchItems(validCarNames);
        setCarNameValue(searchTerm);
        for (let i = 0; i < validCarNames.length; i++) {
            if ((validCarNames[i].Maker + " " + validCarNames[i].Model).toLowerCase() === searchTerm.toLowerCase()) {
                setIsValidCar(true);
            } else {
                setIsValidCar(false);
            }
        }
    }

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

    const handleDateInputChange = (e) => {
        setDate(e.target.value);
    }

    //"/testCar?car=" + carNameValue + "&location=" + LocationValue + "&date="
    const handleSearchButtonClick = () => {
        if (carNameValue && locationValue && date) {
            window.location.href = "/testcar?car=" + carNameValue + "&location=" + locationValue + "&date=" + date;
        } else {
            setEmptyFieldMessage("Please fill in all the fields");
            setTimeout(() => {
                setEmptyFieldMessage("");
            }, 5000);
        }
    }

    return (
        <div className="Home">
            <div className="homeContainer">
                <div className="searchForCarContainer">
                    <div style={{ "width": "240px" }}>
                        <input type="text" placeholder="Car name" value={carNameValue} onFocus={handleCarNameInputFocus} onBlur={handleCarNameInputBlur} onChange={handleCarNameSearchInputChange} />
                        <div className="searchContentContainer" style={carinputMarked ? { "display": "flex" } : { "display": "none" }}>
                            <ul className="searchContentHomeUl" ref={carNameRef}>
                                {carsearchItems.map((item, index) =>
                                    <li className={"searchContentHomeLi " + ((index === carSelected) ? "liSelected" : "")} key={index} onClick={() => handleCarNameClick((item.Maker + " " + item.Model))} >
                                        <div className="searchHomeNameContainer">
                                            <img src={item.Image} alt={(item.Maker + " " + item.Model)} className="searchHomeImage" />
                                            <p>{(item.Maker + " " + item.Model)}</p>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div style={{ "width": "240px" }}>
                        <input type="text" placeholder="Location" value={locationValue} onFocus={handleLocationInputFocus} onBlur={handleLocationInputBlur} onChange={handleLocationSearchInputChange} />
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
                                                <div className="searchHomeLocationContainerBot">
                                                    {isValidCar ? (item.IsAvailable ? "🟢 Available" : "🔴 Not available") : ""}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <input type="date" onChange={handleDateInputChange} value={date} />
                    <div className="searchButtonContainer">
                        <div className="searchButton" style={{ "marginLeft": "10px", "marginTop": "-2px" }} onClick={handleSearchButtonClick}>Search</div>
                        <p className="emptyFieldMessage">{emptyFieldMessage}</p>
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

/**
 * {locationsearchItems.map((item, index) =>
                                    <li className={"searchContentHomeLi " + ((index === locationSelected) ? "liSelected" : "")} key={item.street + ", " + item.postalCode + " " + item.state} onClick={() => {
                                        handleLocationClick(item.name);
                                    }} >
                                        <div className="searchHomeNameContainer">
                                            <div className="searchHomeLocationContainer">
                                                <div className="searchHomeLocationContainerTop">
                                                    {item.name}
                                                </div>
                                                <div className="searchHomeLocationContainerMid">
                                                    {item.street + ", " + item.postalCode + " " + item.state}
                                                </div>
                                                <div className="searchHomeLocationContainerBot">
                                                    {(open(item.open[day]) ? "🟢" : "🔴") + item.open[day]}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )}
 */