import { useEffect, useMemo, useRef, useState } from "react";
import "./css/Home.css";
import axios from "axios";

function Home() {

    const carNameRef = useRef(null);
    const locationRef = useRef(null);

    const [carinputMarked, setCarinputMarked] = useState(false);
    const [carsearchItems, setCarsearchItems] = useState([]);
    const [carNameValue, setCarNameValue] = useState("");
    const [carSelected, setCarSelected] = useState(0);


    const [locationinputMarked, setLocationinputMarked] = useState(false);
    const [locationsearchItems, setLocationsearchItems] = useState([]);
    const [locationValue, setLocationValue] = useState("");
    const [locationSelected, setLocationSelected] = useState(0);
    const [locationDb, setLocationDb] = useState([]);

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
        setCarNameValue(e);
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
    }

    const carList = useMemo(() => [
        {
            name: "Bmw",
            image: "none",
            link: "bmw"
        },
        {
            name: "Audi",
            image: "none",
            link: "audi"
        },
        {
            name: "Skoda",
            image: "none",
            link: "skoda"
        },
        {
            name: "Toyota",
            image: "none",
            link: "toyota"
        },
        {
            name: "McLaren",
            image: "none",
            link: "mclaren"
        }
    ], []);

    //open sunday-saturday
    const locationList = useMemo(() => [
        {
            name: "XY 7-Eleven Ysteneset",
            street: "Sundgata 22",
            postalCode: "6003",
            state: "Ålesund",
            country: "Norway",
            open: [
                "07-23",
                "07-23",
                "07-23",
                "07-23",
                "07-23",
                "07-23",
                "07-23"
            ]
        },
        {
            name: "Moa",
            street: "Moavegen 1",
            postalCode: "6018",
            state: "Ålesund",
            country: "Norway",
            open: [
                "Closed",
                "08-22",
                "08-22",
                "08-22",
                "08-22",
                "08-22",
                "08-20",
            ]
        },
        {
            name: "Obs bygg",
            street: "Smibakken 2",
            postalCode: "6018",
            state: "Ålesund",
            country: "Norway",
            open: [
                "Closed",
                "07-21",
                "07-21",
                "07-21",
                "07-21",
                "07-21",
                "09-19",
            ]
        },
        {
            name: "Møller bil Trondheim",
            street: "Ingvald Ystgaards veg 21",
            postalCode: "7047",
            state: "Trondheim",
            country: "Norway",
            open: [
                "Closed",
                "07:30-16:30",
                "07:30-16:30",
                "07:30-16:30",
                "07:30-16:30",
                "07:30-16:30",
                "10-14",
            ]
        },
        {
            name: "Pilot utleie AS",
            street: "Heggstadmoen 8",
            postalCode: "7080",
            state: "Heimdal",
            country: "Norway",
            open: [
                "Closed",
                "07-16",
                "07-16",
                "07-16",
                "07-16",
                "07-16",
                "Closed",
            ]
        }
    ], []);

    const d = new Date();
    let day = d.getDay();

    let validCarNames = [];

    useEffect(() => {
        axios.get(jsonValue.serverAddress + "api/search/location/" + carNameValue).then(response => {
            const locationsParsed = response.data.map(l => JSON.parse(l));
            setLocationDb(locationsParsed);
        });
    }, [carNameValue, jsonValue]);

    useEffect(() => {
        setLocationsearchItems(locationList);
        setCarsearchItems(carList);
    }, [carList, locationList]);


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
                setCarNameValue(carsearchItems[carSelected].name);
            } else if (locationinputMarked) {
                handleLocationInputBlur();
                setLocationValue(locationsearchItems[locationSelected].name);
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
        for (let i = 0; i < carList.length; i++) {
            if (carList[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
                validCarNames[validItemCounter] = carList[i];
                validItemCounter++;
            }
        }
        validCarNames.sort((a, b) => customSort(a, b, searchTerm));
        setCarsearchItems(validCarNames);
        setCarNameValue(searchTerm);
    }

    var validLocation = [];

    const handleLocationSearchInputChange = (e) => {
        handleLocationInputFocus();
        setLocationSelected(0);
        let searchTerm = e.target.value;
        let validItemCounter = 0;
        validLocation = [];
        for (let i = 0; i < locationList.length; i++) {
            if (locationList[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
                validLocation[validItemCounter] = locationList[i];
                validItemCounter++;
            }
        }
        validLocation.sort((a, b) => customSort(a, b, searchTerm));
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
                                    <li className={"searchContentHomeLi " + ((index === carSelected) ? "liSelected" : "")} key={index} onClick={() => handleCarNameClick(item.name)} >
                                        <div className="searchHomeNameContainer">
                                            <img src={item.image} alt={item.name} className="searchHomeImage" />
                                            <p>{item.name}</p>
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
                            {locationDb.map((item, index) =>
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
                                                    {(open(item.IsAvailable) ? "🟢 Available" : "🔴 Not available")}
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
    if (a.name.startsWith(searchString) && !b.name.startsWith(searchString)) {
        return -1;
    } else if (!a.name.startsWith(searchString) && b.name.startsWith(searchString)) {
        return 1;
    } else {
        return a.name.localeCompare(b.name);
    }
}

/**
 * Returns if the store is open or not.
 * @param {*} timeAsString Time in the format 12:20-19:30, or 12-22
 * @returns if the store is open.
 */
function open(timeAsString) {
    if (timeAsString.toLowerCase() === "closed") return false;
    const open = timeAsString.split("-")[0];
    const closed = timeAsString.split("-")[1];

    let date = new Date();
    let time = date.getHours();
    let minute = date.getMinutes();

    if (closed.includes(":") || open.includes(":")) {
        let closedTotal = closed.split(":");
        let openTotal = open.split(":");
        let openHour = Number(openTotal[0]);
        let openMinute = Number(openTotal[1]);
        let closedHour = Number(closedTotal[0])
        let closedMinute = Number(closedTotal[1]);

        if (openHour > time || closedHour < time) {
            return false;
        } else if ((openHour === time && openMinute > minute)
            || (closedHour === time && closedMinute < minute)) {
            return false;
        } else {
            return true;
        }
    } else {
        if (Number(open) <= time && Number(closed) > time) {
            return true;
        }
    }

}

function findCharacterAtPosition(str, line, position) {
    var s = str[line]
    return s.charAt(position);
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