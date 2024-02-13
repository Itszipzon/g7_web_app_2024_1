import axios from "axios";
import { useEffect, useState } from "react";
import "./TestCar.css";

function TestCar() {

    const [cars, setCars] = useState([]);

    const jsonData = require("../../information.json");

    useEffect(() => {
        axios.get(jsonData.serverAddress + 'test/cars')
            .then(response => {
                const cars = response.data.map(car => JSON.parse(car));
                setCars(cars);
            });
    }, [jsonData]);

    return (
        <div className="CarListPage">
            {cars.map((car) => {
                return (
                    <div key={car.id} className="carDiv">
                        <h1 className="carName">{car.maker + " " + car.model}</h1>
                        <div className="carInfoContainer">
                            <p>{car.year}</p>
                            <p>{car.fuel + " " + car.transmission}</p>
                            <p>{"Seats: " + car.seats}</p>
                            <p>Extras:</p>
                            <ul className="carExtras">
                                {car.extras.map((extra, index) => (
                                    <li key={index}>{"- " + extra}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default TestCar;