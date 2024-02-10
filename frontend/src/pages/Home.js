import { useEffect, useMemo, useState } from "react";
import "./css/Home.css";
function Home() {

    const [carinputMarked, setCarinputMarked] = useState(false);
    const [carsearchItems, setCarsearchItems] = useState([]);
    const [carNameValue, setCarNameValue] = useState("");

    
    const [LocationinputMarked, setLocationinputMarked] = useState(false);
    const [LocationsearchItems, setLocationsearchItems] = useState([]);
    const [LocationValue, setLocationValue] = useState("");

    const handleCarNameInputFocus = () => {
        setCarinputMarked(true);
    }

    const handleCarNameInputBlur = () => {
        setTimeout(() => {
            setCarinputMarked(false);
        }, 110);
    }

    const handleCarNameClick = (e) => {
        setCarNameValue(e);
    }

    const handleLocationInputFocus = () => {
        setLocationinputMarked(true);
    }

    const handleLocationInputBlur = () => {
        setTimeout(() => {
            setLocationinputMarked(false);
        }, 110);
    }

    const handleLocationClick = (e) => {
        setLocationValue(e);
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
        },
    ], []) 

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
                "10:30-14:30",
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
        setLocationsearchItems(locationList);
        setCarsearchItems(carList);
    }, [carList, locationList]);

    const handleCarNameSearchInputChange = (e) => {
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

    const handleSearchButtonClick = () => {

    }

    return (
        <div className="Home">
            <div className="homeContainer">
                <div className="searchForCarContainer">
                    <div style={{ "width": "240px" }}>
                        <input type="text" placeholder="Car name" value={carNameValue} onFocus={handleCarNameInputFocus} onBlur={handleCarNameInputBlur} onChange={handleCarNameSearchInputChange} />
                        <div className="searchContentContainer" style={carinputMarked ? { "display": "flex" } : { "display": "none" }}>
                            <ul className="searchContentHomeUl">
                                {carsearchItems.map((item, index) =>
                                    <li className="searchContentHomeLi" key={index} onClick={() => handleCarNameClick(item.name)} >
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
                        <input type="text" placeholder="Location" value={LocationValue} onFocus={handleLocationInputFocus} onBlur={handleLocationInputBlur} onChange={handleLocationSearchInputChange} />
                        <div className="searchContentContainer" style={LocationinputMarked ? { "display": "flex" } : { "display": "none" }}>
                            <ul className="searchContentHomeUl">
                                {LocationsearchItems.map((item) =>
                                    <li className="searchContentHomeLi" key={item.street + ", " + item.postalCode + " " + item.state} onClick={() => handleLocationClick(item.name)} >
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
                            </ul>
                        </div>
                    </div>
                    <input type="date" />
                    <div className="searchButton" style={{ "marginLeft": "10px", "marginTop": "-2px" }} onClick={handleSearchButtonClick}>Search</div>
                    
                </div>
            </div>
        </div>
    );
}

export default Home;

function customSort(a, b, searchString) {
    if (a.name.startsWith(searchString) && !b.name.startsWith(searchString)) {
        return -1;
    } else if (!a.name.startsWith(searchString) && b.name.startsWith(searchString)) {
        return 1;
    } else {
        return a.name.localeCompare(b.name);
    }
}

function open(timeAsString) {
    if (timeAsString.toLowerCase() === "closed") return false;
    const open = timeAsString.split("-")[0];
    const closed = timeAsString.split("-")[1];

    let openNow = false;

    let date = new Date();
    let time = date.getHours();
    let minute = date.getMinutes();
    
    if (closed.includes(":") || open.includes(":")) {
        let closedTotal = closed.split(":");
        let openTotal = open.split(":");

        if (Number(openTotal[0]) > time || Number(closedTotal[0]) < time) {
            return false;
        } else if (Number(openTotal[0]) < time && Number(closedTotal[0]) < time) {
            return true;
        } else if ((Number(openTotal[0]) === time && Number(openTotal[1]) > minute) 
            || (Number(closedTotal[0]) === time && Number(closedTotal[1]) < minute)) {
                return false;
        } else {
            return true;
        }
    } else {
        if (Number(closed) > time && Number(open) < time) {
            openNow = true;
        }
    }

    return openNow;

}