import { useEffect, useState } from 'react';
import './Test.css';
import axios from 'axios';

function Test() {

    const [testValue, setTestValue] = useState('');

    useEffect(() => {
        axios.get("http://localhost:8080/test/first").then((r) => {
            setTestValue(r.data);
        });
    }, []);

    return (
        <div className="TestPage">
            <div className='TestPageElement'>
                <h1>The first Test </h1>
                <div className='TestContent'>
                    {testValue}
                </div>
            </div>
        </div>
    );
}

export default Test;