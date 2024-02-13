import axios from "axios";
import "./TestCarPage.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

function TestCarPage() {

    let { name } = useParams();

    const [car, setCar] = useState([]);

    const jsonData = require("../../information.json");

    useEffect(() => {
        axios.get(jsonData.serverAddress + 'test/cars/get/' + name)
            .then(response => {
                const cars = response.data.map(car => JSON.parse(car));
                console.log(cars);
                setCar(cars);
            });
    }, [jsonData, name]);

  return (
    <div>
      {car.map((car) => {
        return (
          <div key={car.LocationName} className="carDiv">
            <h1 className="carDeliverer">{car.LocationName + ", Address: " + car.LocationAddress}</h1>
            <h2 className="carName">{car.CarMaker + " " + car.CarModel}</h2>
            <div className="carInfoContainer">
              <p>{car.CarYear}</p>
              <p>{car.CarFuel}</p>
              <p>{car.CarTransmission}</p>
              <p>{"Seats: " + car.CarSeats}</p>
              <p>Extras:</p>
              <ul className="carExtras">
                {car.CarExtras.map((extra, index) => (
                  <li key={index}>{"- " + extra}</li>
                ))}
              </ul>
              <p>{"Price: " + car.Price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TestCarPage;