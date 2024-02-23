import { useEffect, useState } from 'react';
import './css/Search.css';
import { useNavigate } from 'react-router';
import CarCard from '../elements/CarCard';

function Search() {

    return (
        <div className="searchPage">
            <div className="navSideBar">
                <div className="navSideSearch">
                    <h1>Type</h1>

                    <div className="checkBox">
                        <input type="checkbox" name="Sport" value="2" />
                        <label for="Sport">Sport<p>(10)</p></label>

                    </div>
                    <div className="checkBox">
                        <input type="checkbox" name="SUV" value="2" />
                        <label for="SUV">SUV</label>
                        <p></p>
                    </div>
                    <div className="checkBox">
                        <input type="checkbox" name="Station wagon" value="2" />
                        <label for="Stationwagon">Station wagon</label>
                    </div>
                    <div className="checkBox">
                        <input type="checkbox" name="Sedan" value="2" />
                        <label for="Sedan">Sedan</label>
                    </div>
                    <div className="checkBox">
                        <input type="checkbox" name="Coupe" value="2" />
                        <label for="Coupe">Coupe</label>
                    </div>
                    <div className="checkBox">
                        <input type="checkbox" name="Hatchback" value="2" />
                        <label for="Hatchback">Hatchback</label>
                    </div>
                    <div className="checkBox">
                        <input type="checkbox" name="2 persons" value="2" />
                        <label for="2 persons">2 persons</label>
                    </div>

                    <h1>Capacity</h1>

                    <div className="checkBox">
                        <input type="checkbox" name="2 persons" value="2" />
                        <label for="2 persons">2 persons</label>
                    </div>
                    <div className="checkBox">
                        <input type="checkbox" name="4 persons" value="2" />
                        <label for="4 persons">4 persons</label>
                    </div>
                    <div className="checkBox">
                        <input type="checkbox" name="5 persons" value="2" />
                        <label for="5 persons">5 persons</label>
                    </div>
                    <div className="checkBox">
                        <input type="checkbox" name="6+ persons" value="2" />
                        <label for="6+ persons">6+ persons</label>
                    </div>

                </div>

                <div className="navMap">
                    <h1>MAP</h1>
                </div>

            </div>

            <div className="searchPageContainer">
                <div className="searchCarContainer">
                    <div className="searchCarTitle">Cars</div>
                    <div className="searchCarContent">
                        <CarCard key={"a"}
                            style={{ "Height": "390px", "Width": "280px" }}
                            src={""}
                            name="VolksWagen Golf"
                            body="Hatchback"
                            fuel="Diesel"
                            year="2007"
                            transmission="Manual"
                            seats="5"
                            price="550"
                            link="/"
                        />
                        <CarCard key={"a"}
                            src={""}
                            name="VolksWagen Golf"
                            body="Hatchback"
                            fuel="Diesel"
                            year="2007"
                            transmission="Manual"
                            seats="5"
                            price="550"
                            link="/"
                        />
                        <CarCard key={"a"}
                            src={""}
                            name="VolksWagen Golf"
                            body="Hatchback"
                            fuel="Diesel"
                            year="2007"
                            transmission="Manual"
                            seats="5"
                            price="550"
                            link="/"
                        />
                        <CarCard key={"a"}
                            src={""}
                            name="VolksWagen Golf"
                            body="Hatchback"
                            fuel="Diesel"
                            year="2007"
                            transmission="Manual"
                            seats="5"
                            price="550"
                            link="/"
                        />
                        <CarCard key={"a"}
                            src={""}
                            name="VolksWagen Golf"
                            body="Hatchback"
                            fuel="Diesel"
                            year="2007"
                            transmission="Manual"
                            seats="5"
                            price="550"
                            link="/"
                        />
                        <CarCard key={"a"}
                            src={""}
                            name="VolksWagen Golf"
                            body="Hatchback"
                            fuel="Diesel"
                            year="2007"
                            transmission="Manual"
                            seats="5"
                            price="550"
                            link="/"
                        />
                        <CarCard key={"a"}
                            src={""}
                            name="VolksWagen Golf"
                            body="Hatchback"
                            fuel="Diesel"
                            year="2007"
                            transmission="Manual"
                            seats="5"
                            price="550"
                            link="/"
                        />
                        <CarCard key={"a"}
                            src={""}
                            name="VolksWagen Golf"
                            body="Hatchback"
                            fuel="Diesel"
                            year="2007"
                            transmission="Manual"
                            seats="5"
                            price="550"
                            link="/"
                        />
                        <CarCard key={"a"}
                            src={""}
                            name="VolksWagen Golf"
                            body="Hatchback"
                            fuel="Diesel"
                            year="2007"
                            transmission="Manual"
                            seats="5"
                            price="550"
                            link="/"
                        />
                        <CarCard key={"a"}
                            src={""}
                            name="VolksWagen Golf"
                            body="Hatchback"
                            fuel="Diesel"
                            year="2007"
                            transmission="Manual"
                            seats="5"
                            price="550"
                            link="/"
                        />
                        <CarCard key={"a"}
                            src={""}
                            name="VolksWagen Golf"
                            body="Hatchback"
                            fuel="Diesel"
                            year="2007"
                            transmission="Manual"
                            seats="5"
                            price="550"
                            link="/"
                        />
                        <CarCard key={"a"}
                            src={""}
                            name="VolksWagen Golf"
                            body="Hatchback"
                            fuel="Diesel"
                            year="2007"
                            transmission="Manual"
                            seats="5"
                            price="550"
                            link="/"
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;