import { useParams } from 'react-router';
import './css/CarPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function CarPage() {
  const jsonValue = require("../information.json");
  const [addedCar, setAddedCar] = useState(false);
  const { id } = useParams();

  const [amountOfImages, setAmountOfImages] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(jsonValue.serverAddress + 'api/get/car/imagecount/' + id)
      .then((response) => {
        setAmountOfImages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching amount of images:', error);
      });
  }, [id, jsonValue]);

  useEffect(() => {
    let imageUrls = [];
    for (let i = 0; i < amountOfImages; i++) {
      imageUrls.push(jsonValue.serverAddress + 'api/car/img/' + id + '/' + i);
    }
    setImages(imageUrls);
  }, [amountOfImages, id, jsonValue]);

  return(
    <div className="CarPage">
      <img src={images[0]} alt="Car" />
    </div>
  )
}

export default CarPage;
