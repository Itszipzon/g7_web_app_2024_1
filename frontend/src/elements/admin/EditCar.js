import { useEffect, useState } from 'react';
import './css/EditCar.css';
import axios from 'axios';

function EditCar({ car = {
  ID: 0,
  Maker: "",
  Model: "",
  Year: 0,
  Images: [],
  Fuel: "",
  Transmission: "",
  Seats: "",
  Body: ""
}, close }) {

  const jsonValue = require("../../information.json");

  const [imageCounter, setImageCounter] = useState(0);

  const [ID, setID] = useState(0);
  const [defaultMaker, setDefaultMaker] = useState("");
  const [defaultModel, setDefaultModel] = useState("");
  const [defaultYear, setDefaultYear] = useState(0);
  const [defaultImages, setDefaultImages] = useState([]);
  const [defaultFuel, setDefaultFuel] = useState("");
  const [defaultTransmission, setDefaultTransmission] = useState("");
  const [defaultSeats, setDefaultSeats] = useState(0);
  const [defaultBody, setDefaultBody] = useState("");

  const [maker, setMaker] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [images, setImages] = useState([]);
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [seats, setSeats] = useState(0);
  const [body, setBody] = useState("");

  const [changes, setChanges] = useState(false);

  useEffect(() => {
    if (car && car.ID > 0) {
      setDefaultMaker(car.Maker);
      setDefaultModel(car.Model);
      setDefaultYear(car.Year.toString());
      setDefaultImages(car.Images);
      setDefaultFuel(car.Fuel);
      setDefaultTransmission(car.Transmission);
      setDefaultSeats(car.Seats.toString());
      setDefaultBody(car.Body);

      setID(car.ID);
      setMaker(car.Maker);
      setModel(car.Model);
      setYear(car.Year.toString());
      setImages(car.Images);
      setFuel(car.Fuel);
      setTransmission(car.Transmission);
      setSeats(car.Seats.toString());
      setBody(car.Body);

      axios.get(jsonValue.serverAddress + "api/get/car/imagecount/" + car.ID)
        .then((r) => {
          setImageCounter(r.data);
        });
    }
  }, [car])

  useEffect(() => {
    if (defaultMaker !== maker || defaultModel !== model
        || defaultYear !== year || defaultImages !== images
        || defaultFuel !== fuel || defaultTransmission !== transmission
        || defaultSeats !== seats || defaultBody !== body) {
      setChanges(true);
    } else {
      setChanges(false);
    }
  }, [defaultMaker, defaultModel, defaultYear, defaultImages, defaultFuel, defaultTransmission, defaultSeats, defaultBody, maker, model, year, images, fuel, transmission, seats, body])

  const handleMakerChange = (e) => {
    setMaker(e.target.value);
  }

  const handleModelChange = (e) => {
    setModel(e.target.value);
  }

  const handleYearChange = (e) => {
    setYear(e.target.value);
  }

  const handleFuelChange = (e) => {
    setFuel(e.target.value);
  }
  
  const handleTransmissionChange = (e) => {
    setTransmission(e.target.value);
  }

  const handleSeatsChange = (e) => {
    setSeats(e.target.value);
  }

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  }

  return (
    !car || car.length === 0 ?
      <div className='carNotFound'>
        <h1>Car not found</h1>
      </div>
      :
      <div className='editCar'>
        <div className='editCarImages'>

        </div>
        <div className='closeButton' onClick={close} >
          X
        </div>
        <h1>Edit {defaultMaker + " " + defaultModel}</h1>
        <div className='editCarInputDiv'>
          <label>ID</label>
          <input type='text' value={ID} readOnly/>
        </div>
        <div className='editCarInputDiv'>
          <label>Maker</label>
          <input type='text' value={maker} onChange={handleMakerChange}/>
        </div>
        <div className='editCarInputDiv'>
          <label>Model</label>
          <input type='text' value={model} onChange={handleModelChange}/>
        </div>
        <div className='editCarInputDiv'>
          <label>Year</label>
          <input type='number' value={year} onChange={handleYearChange}/>
        </div>
        <div className='editCarInputDiv'>
          <label>Fuel</label>
          <input type='text' value={fuel} onChange={handleFuelChange}/>
        </div>
        <div className='editCarInputDiv'>
          <label>Transmission</label>
          <input type='text' value={transmission} onChange={handleTransmissionChange}/>
        </div>
        <div className='editCarInputDiv'>
          <label>Seats</label>
          <input type='number' value={seats} onChange={handleSeatsChange}/>
        </div>
        <div className='editCarInputDiv'>
          <label>Body</label>
          <input type='text' value={body} onChange={handleBodyChange}/>
        </div>
        <div className='editCarInputDiv'>
          <button>Edit images</button>
        </div>
        <div className='editButtonHolder'>
          <button className='editButton' disabled={!changes}>Save Changes</button>
        </div>
      </div>

  )

}

export default EditCar;