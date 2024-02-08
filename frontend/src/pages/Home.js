import { useEffect, useState } from "react";
import "./css/Home.css";
import { Link } from "react-router-dom";

function Home() {

    const [carinputMarked, setCarinputMarked] = useState(false);
    const [carsearchItems, setCarsearchItems] = useState([]);
    const [carNameValue, setCarNameValue] = useState("");

    const handleInputFocus = () => {
        setCarinputMarked(true);
    }

    const handleInputBlur = () => {
        setTimeout(() => {
            setCarinputMarked(false);
        }, 150);
    }

    const handleCarNameClick = (e) => {
        setCarNameValue(e);
    }

    const carList = [
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
    ]

    let validCarNames = [];

    useEffect(() => {
        setCarsearchItems(carList);
    }, []);

    const handleSearchInputChange = (e) => {
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

    const handleSearchButtonClick = () => {

    }

    return (
        <div className="Home">
            <div className="homeContainer">
                <div className="searchForCarContainer">
                    <div style={{"width" : "240px"}}>
                        <input type="text" placeholder="Car name" value={carNameValue} onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={handleSearchInputChange} />
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
                    <input type="text" placeholder="Location" />
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