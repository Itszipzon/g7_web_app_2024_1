import { useEffect } from 'react';
import './css/EditCar.css';
import axios from 'axios';

function EditCar(
  carId = 0
) {

  const jsonValue = require("../../information.json");

  useEffect(() =>  {
    if (carId === 0) {
      return;
    }
    axios.get(jsonValue.serverAddress + "api/get/car/" + carId)
  });

  <div className="editCar">

  </div>

  return(
      {{carId === 0 ? }}
    )

}

export default EditCar;