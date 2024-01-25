import { useEffect, useState } from 'react';
import './Test.css';
import axios from 'axios';

function Test() {

    const [value, setValue] = useState('');

    useEffect(() => {
        axios.get("http://localhost:8080/test/first").then((r) => {
            setValue(r.data);
        });
    }, []);

    return (
        <div className="TestPage">
            <div className='TestPageElement'>
                <h1>The first Test </h1>
                <div className='TestContent'>
                    {value}
                </div>
            </div>
        </div>
    );
}

export default Test;