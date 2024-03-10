import { useEffect, useState } from 'react';
import './css/AddNewCar.css';
import axios from 'axios';

function AddNewCar(
  { close }
) {

  const jsonValue = require("../../information.json");

  const [maker, setMaker] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [fuel, setFuel] = useState('');
  const [transmission, setTransmission] = useState('');
  const [seats, setSeats] = useState('');
  const [body, setBody] = useState('');
  const [extras, setExtras] = useState([]);

  const [shownImages, setShownImages] = useState([]);
  const [images, setImages] = useState([]);

  const [imageFrom, setImageFrom] = useState('');
  const [showImageScreen, setShowImageScreen] = useState(false);

  const [extrasSelected, setExtrasSelected] = useState(['']);
  const [showExtrasScreen, setShowExtrasScreen] = useState(false);

  const [showNewExtraScreen, setShowNewExtraScreen] = useState(false);
  const [newExtra, setNewExtra] = useState('');

  const carData = {
    maker: '',
    model: '',
    year: '',
    fuel: '',
    transmission: '',
    seats: '',
    body: ''
  }

  const handleShowImageScreen = () => {
    setShowImageScreen(!showImageScreen);
  }

  const handleShowExtrasScreen = () => {
    setShowExtrasScreen(!showExtrasScreen);
  }

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const uploadedFilesShown = Array.from(files).map(file => URL.createObjectURL(file));
    setShownImages([...shownImages, ...uploadedFilesShown]);
    const uploadedFiles = Array.from(files);
    setImages(uploadedFiles);
  }

  const handleImageMove = (index, direction) => {
    const newImage = [...images];
    const newShownImage = [...shownImages];
    const shownTemp = newShownImage[index];
    if (direction === 'up' && index > 0) {
      newShownImage[index] = newShownImage[index - 1];
      newImage[index] = newImage[index - 1];
      newShownImage[index - 1] = shownTemp;
    } else if (direction === 'down' && index < newShownImage.length - 1) {
      newShownImage[index] = newShownImage[index + 1];
      newShownImage[index + 1] = shownTemp;
      newImage[index] = newImage[index + 1];
    }
    setShownImages(newShownImage);
    setImages(newImage);
  }

  const handleImageFromChange = (e) => {
    setImageFrom(e.target.value);
  }

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

  const handleExtrasChange = (e, index) => {
    const newExtrasSelected = [...extrasSelected];
    const value = e.target.value;
    if (value === '') {
      newExtrasSelected.splice(index, 1);
      setExtrasSelected(newExtrasSelected);
      return;
    }
    newExtrasSelected[index] = e.target.value;
    setExtrasSelected(newExtrasSelected);
  };

  const handleAddExtraSelect = () => {
    setExtrasSelected([...extrasSelected, '']);
  };

  const showNewExtraScreenClick = () => {
    setNewExtra('');
    setShowNewExtraScreen(!showNewExtraScreen);
  }

  const handleNewExtraChange = (e) => {
    setNewExtra(e.target.value);
  }

  const handleAddNewExtraClick = () => {
    if (newExtra === '') {
      alert('Extra cannot be empty');
      return;
    }
    axios.post(jsonValue.serverAddress + 'post/new/extra/' + localStorage.getItem("UIDtoken"), { extra: newExtra }).then((response) => {
      if (response.status === 200) {
        setExtras([...extras, newExtra]);
        setNewExtra('');
        setShowNewExtraScreen(false);
      }
    });
  }

  useEffect(() => {
    axios.get(jsonValue.serverAddress + "api/get/extras").then((response) => {
      setExtras(response.data);
    });
  }, [jsonValue]);

  const handleSaveClick = () => {

    if (maker === '' || model === '' || year === '' || fuel === '' || transmission === '' || seats === '' || body === '' || images.length === 0) {
      alert('All fields are required');
      return;
    }

    if (imageFrom === '') {
      alert('Please add image from field');
      return;
    }

    carData.maker = maker;
    carData.model = model;
    carData.year = year;
    carData.fuelType = fuel;
    carData.transmission = transmission;
    carData.seats = seats;
    carData.body = body;

    axios.post(jsonValue.serverAddress + 'post/new/car', carData).then(
      (response) => {
        if (response.status === 200) {

          axios.get(jsonValue.serverAddress + "api/car/get/"
            + maker + "/" + model + "/" + year).then((r) => {

              let validExtras = extrasSelected.filter(extra => extra !== '');

              axios.post(jsonValue.serverAddress + 'post/new/car/extras', { cid: r.data, extras: validExtras }).then((r) => {
                if (r.status === 200) {
                  console.log('Extras posted');
                }
              });

              images.map((image, index) => {
                let formData = new FormData();
                formData.append('cid', r.data);
                formData.append('imageFile', image);
                formData.append('imageNumber', index);
                formData.append('imageFrom', imageFrom);
                console.log(formData);
                axios.post(jsonValue.serverAddress + 'post/new/car/image', formData).then((r) => {
                  if (r.status === 200) {
                    console.log('Image posted');
                  }
                })
                return null;
              });

              window.location.reload();
            });
        }
      }
    );
  }

  return (
    <div className='AddNewCar'>
      <div className='imageScreen' style={{ display: showImageScreen ? 'block' : 'none' }}>
        <div className='closeButton' onClick={handleShowImageScreen} >
          X
        </div>
        {shownImages.length > 0 &&
          <input type='text' placeholder='Image from' onChange={handleImageFromChange} value={imageFrom} />
        }
        <input type='file' onChange={handleImageUpload} multiple />
        <div className='addImagesHolder'>
          {shownImages.map((image, index) => {
            return (
              <div key={index} className='imageDiv'>
                <img src={image} alt='car' />
                <div className='imageButtons'>
                  <button onClick={() => handleImageMove(index, "up")} disabled={index === 0}>^</button>
                  <button style={{ "transform": "rotate(180deg)" }} onClick={() => handleImageMove(index, "down")} disabled={index === shownImages.length - 1}>^</button>
                </div>
              </div>
            )
          })}

        </div>
      </div>
      <div className='extrasScreen' style={showExtrasScreen ? { display: "flex" } : { display: "none" }}>
        <div className='closeButton' onClick={handleShowExtrasScreen} >
          X
        </div>
        <h1>Add extras</h1>
        <div className='extrasHolder'>
          <div className='addNewExtraHolder' style={showNewExtraScreen ? { display: "flex" } : { display: "none" }}>
            <div className='closeButton' onClick={showNewExtraScreenClick} >
              X
            </div>
            <h1>Add new extra</h1>
            <div className='newExtraContent'>
              <div className='inputDiv'>
                <label>Extra</label>
                <input value={newExtra} type='text' onChange={handleNewExtraChange}/>
              </div>
              <div className='newExtraButton' onClick={handleAddNewExtraClick}>
                Add
              </div>
            </div>
            <p>Make sure the extra doesnt already exist</p>
          </div>
          <div className='extrasSelectHolder'>
            {extrasSelected.map((selectedExtra, index) => (
              <select key={index} value={extrasSelected[index]} onChange={(e) => handleExtrasChange(e, index)}>
                <option value=''>Select extra</option>
                {extras
                  .filter(extra => !extrasSelected.includes(extra) || selectedExtra === extra)
                  .map((extra, i) => (
                    <option key={extra + i} value={extra}>{extra}</option>
                  ))}
              </select>
            ))}

            <div className='addExtraButtonHolder'>
              <div className='addExtraButton' onClick={handleAddExtraSelect}>
                +
              </div>
            </div>
          </div>

        </div>
        <div className='addNewExtraButtonHolder'>
          <div className='addNewExtraButton' onClick={showNewExtraScreenClick}>
            Add new extra
          </div>
        </div>
      </div>
      <div className='topDiv'>
        <h1>Add new car</h1>
        <div className='closeButton' onClick={close} >
          X
        </div>
        <div className='extrasSelects'>

        </div>
      </div>
      <div className='newCarForm'>
        <div className='inputDiv'>
          <label>Maker</label>
          <input onChange={handleMakerChange} value={maker} type='text' />
        </div>
        <div className='inputDiv'>
          <label>Model</label>
          <input onChange={handleModelChange} value={model} type='text' />
        </div>
        <div className='inputDiv'>
          <label>Body</label>
          <input onChange={handleBodyChange} value={body} type='text' />
        </div>
        <div className='inputDiv'>
          <label>Year</label>
          <select onChange={handleYearChange} value={year}>
            <option value=''>Select Year</option>
            {getYears().map(year =>
              <option key={year} value={year}>{year}</option>)
            }
          </select>
        </div>
        <div className='inputDiv'>
          <label>Fuel</label>
          <select onChange={handleFuelChange} value={fuel}>
            <option value="">Select Fuel</option>
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="Electric">Electric</option>
            <option value="Hydrogen">Hydrogen</option>
          </select>
        </div>
        <div className='inputDiv'>
          <label>Transmission</label>
          <select onChange={handleTransmissionChange} value={transmission}>
            <option value="">Select Transmission</option>
            <option value="Diesel">Automatic</option>
            <option value="Petrol">Manual</option>
          </select>
        </div>
        <div className='inputDiv'>
          <label>Seats</label>
          <input onChange={handleSeatsChange} value={seats} type='number' />
        </div>
        <div className='imageDiv'>
          <button onClick={handleShowExtrasScreen}>Add extras</button>
        </div>
        <div className='imageDiv'>
          <button onClick={handleShowImageScreen}>Add images</button>
        </div>
        <div className='buttonDiv'>
          <button onClick={handleSaveClick}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default AddNewCar;

function getYears() {
  let years = [];
  let currentYear = new Date().getFullYear() + 1;

  for (let i = currentYear; i >= 1885; i--) {
    years.push(i);
  }

  return years;
}