import { useEffect, useState } from 'react';
import './Test.css';
import axios from 'axios';

function Test() {

    const [testValue, setTestValue] = useState('');
    const [image, setImage] = useState(null);

    const imageUrl = "http://localhost:8080/test/image/astronaut.png";

    const fetchImage = async () => {
        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImage(imageObjectURL);
      };

    useEffect(() => {
        axios.get("http://localhost:8080/test/first").then((r) => {
            setTestValue(r.data);
        });

        fetchImage();
    }, []);

    return (
        <div className="TestPage">
            <div className='TestPageElement'>
                <h1>The first Test</h1>
                <div className='TestContent'>
                    {testValue}
                </div>
            </div>
            <div className='TestPageElement'>
                <h1>The Image Test</h1>
                <div className='TestContent'>
                    {image && <img src={image} alt='Astronaut' className='testImage' />}
                </div>
            </div>
            <div className='TestPageElement'>
                <h1>Next Test?</h1>
                <div className='TestContent'>
                    
                </div>
            </div>
        </div>
    );
}

/*
<div className='TestPageElement'>
    <h1>The header of the test</h1>
    <div className='TestContent'>
        Put the content of the test in here
    </div>
</div>
 */

export default Test;