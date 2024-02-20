import { useState } from 'react';
import './css/Search.css';
import { useNavigate } from 'react-router';

function Search() {

    const [carBrand, setCarBrand] = useState('');
    const [location, setLocation] = useState('');

    const history = useNavigate();

    const handleHistoryChanege = () => {
        history('/search?carbrand=' + carBrand);
    }

    const handleCarBrandChange = (e) => {
        if (e.target.checked) {
            if (carBrand === '') {
                setCarBrand(e.target.value);
            } else {
                setCarBrand(carBrand + ',' + e.target.value);
            }
        } else {
            if (carBrand.includes(',')) {
                let newCarBrand = carBrand.replace(',' + e.target.value, '');
                setCarBrand(newCarBrand);
            } else {
                let newCarBrand = carBrand.replace(e.target.value, '');
                setCarBrand(newCarBrand);
            }
        }
        console.log(carBrand);
    }

    const handleLocationChange = (e) => {
        if (e.target.checked) {
            if (location === '') {
                setLocation(e.target.value);
            } else {
                setLocation(location + ',' + e.target.value);
            }
        } else {
            if (location.includes(',')) {
                let newLocation = location.replace(',' + e.target.value, '');
                setLocation(newLocation);
            } else {
                let newLocation = location.replace(e.target.value, '');
                setLocation(newLocation);
            }
        }
        console.log(location);
    }

    return (
        <div className="searchPage">
            <div className="searchPage_info">
                <ul>
                    <h2>Car brand</h2>
                    <li>
                        <input onChange={handleCarBrandChange} type='checkbox' id='audi' name='audi' value='audi' />
                        <label htmlFor='audi'>Audi</label>
                    </li>
                    <li>
                        <input onChange={handleCarBrandChange} type='checkbox' id='bmw' name='bmw' value='bmw' />
                        <label htmlFor='bmw'>BMW</label>
                    </li>
                    <li>
                        <input onChange={handleCarBrandChange} type='checkbox' id='tesla' name='tesla' value='tesla' />
                        <label htmlFor='tesla'>Tesla</label>
                    </li>
                    <li>
                        <input onChange={handleCarBrandChange} type='checkbox' id='volksvagen' name='volksvagen' value='volksvagen' />
                        <label htmlFor='volksvagen'>VolksWagen</label>
                    </li>
                    <li>
                        <input onChange={handleCarBrandChange} type='checkbox' id='peugeot' name='peugeot' value='peugeot' />
                        <label htmlFor='peugeot'>Peugeot</label>
                    </li>
                </ul>
                <ul>
                    <h2>Location</h2>
                    <li>
                        <input onChange={handleLocationChange} type='checkbox' id='audi' name='audi' value='audi' />
                        <label htmlFor='audi'>Audi</label>
                    </li>
                    <li>
                        <input onChange={handleLocationChange} type='checkbox' id='bmw' name='bmw' value='bmw' />
                        <label htmlFor='bmw'>BMW</label>
                    </li>
                    <li>
                        <input onChange={handleLocationChange} type='checkbox' id='tesla' name='tesla' value='tesla' />
                        <label htmlFor='tesla'>Tesla</label>
                    </li>
                    <li>
                        <input onChange={handleLocationChange} type='checkbox' id='audi' name='audi' value='audi' />
                        <label htmlFor='audi'>Audi</label>
                    </li>
                    <li>
                        <input onChange={handleLocationChange} type='checkbox' id='audi' name='audi' value='audi' />
                        <label htmlFor='audi'>Audi</label>
                    </li>
                </ul>
                <ul>
                    <h2>Location</h2>
                    <li>
                        <input onChange={handleCarBrandChange} type='checkbox' id='audi' name='audi' value='audi' />
                        <label htmlFor='audi'>Audi</label>
                    </li>
                    <li>
                        <input onChange={handleCarBrandChange} type='checkbox' id='bmw' name='bmw' value='bmw' />
                        <label htmlFor='bmw'>BMW</label>
                    </li>
                    <li>
                        <input onChange={handleCarBrandChange} type='checkbox' id='tesla' name='tesla' value='tesla' />
                        <label htmlFor='tesla'>Tesla</label>
                    </li>
                    <li>
                        <input onChange={handleCarBrandChange} type='checkbox' id='audi' name='audi' value='audi' />
                        <label htmlFor='audi'>Audi</label>
                    </li>
                    <li>
                        <input onChange={handleCarBrandChange} type='checkbox' id='audi' name='audi' value='audi' />
                        <label htmlFor='audi'>Audi</label>
                    </li>
                </ul>
            </div>
            <div className="searchPage_results">
                <button onClick={() => history('/search?carbrand=' + carBrand)}>Test</button>
            </div>
        </div>
    );
}

export default Search;