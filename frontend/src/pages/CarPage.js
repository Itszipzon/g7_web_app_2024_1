import { useParams } from 'react-router';
import './css/CarPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function CarPage() {
  const jsonValue = require("../information.json");
  const [addedCar, setAddedCar] = useState(false);
  const [car, setCar] = useState([]);
  const { id } = useParams();

  const [amountOfImages, setAmountOfImages] = useState(0);
  const [images, setImages] = useState([]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [firstImage, setFirstImage] = useState(1);
  const [secondImage, setSecondImage] = useState(2);
  const [thirdImage, setThirdImage] = useState(3);

  const [bigImage, setBigImage] = useState(false);

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

  useEffect(() => {
    axios.get(jsonValue.serverAddress + 'api/get/car/' + id)
      .then((response) => {
        setCar(response.data);
      })
      .catch((error) => {
        console.error('Error fetching added car:', error);
      });
  }, []);

  const handleBigImageClick = () => {
    setBigImage(!bigImage);
  }

  const handlePrevButtonClick = () => {
    setSelectedImage(prevImage(selectedImage, amountOfImages));
    setFirstImage(prevImage(firstImage, amountOfImages));
    setSecondImage(prevImage(secondImage, amountOfImages));
    setThirdImage(prevImage(thirdImage, amountOfImages));
  }

  const handleNextButtonClick = () => {
    setSelectedImage(nextImage(selectedImage, amountOfImages));
    setFirstImage(nextImage(firstImage, amountOfImages));
    setSecondImage(nextImage(secondImage, amountOfImages));
    setThirdImage(nextImage(thirdImage, amountOfImages));
  }

  return (
    <div className="CarPage">
      <div className='bigImageHolder' style={bigImage ? { "display": "flex" } : { "display": 'none' }}>
        <div className='bigImage'>
          <div className='bigImageExit' onClick={handleBigImageClick} >X</div>
          <div className='bigImagePrev' onClick={handlePrevButtonClick} >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 15L16 12M16 12L13 9M16 12H8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </div>
          <img src={images[selectedImage]} alt='Car' />
          <div className='bigImageNext' onClick={handleNextButtonClick} >
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 15L16 12M16 12L13 9M16 12H8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      <div className='carPageTop'>
        <h1>{car.Maker + " " + car.Model}</h1>
        <div className='imageHolder'>
          <div className='displayedImage'>
            <img src={images[selectedImage]} alt='Car' onClick={handleBigImageClick} />

            <div className='prevImage' onClick={handlePrevButtonClick}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 15L16 12M16 12L13 9M16 12H8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </div>
            <div className='nextImage' onClick={handleNextButtonClick} >
              <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 15L16 12M16 12L13 9M16 12H8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className='imageSelector'>
            <div className='imageSelectorImage'>
              <img src={images[firstImage]} alt='Car' />
            </div>
            <div className='imageSelectorImage'>
              <img src={images[secondImage]} alt='Car' />
            </div>
            <div className='imageSelectorImage'>
              <img src={images[thirdImage]} alt='Car' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarPage;

function nextImage(selectedImage, amountOfImages) {
  if (selectedImage < amountOfImages - 1) {
    return selectedImage + 1;
  } else {
    return 0;
  }
}

function prevImage(selectedImage, amountOfImages) {
  if (selectedImage > 0) {
    return selectedImage - 1;
  } else {
    return amountOfImages - 1;
  }
}
