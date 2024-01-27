import { useEffect, useRef, useState } from 'react';
import './Test.css';
import axios from 'axios';

function Test() {

    const [testValue, setTestValue] = useState('');
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [displayImage, setDisplayImage] = useState(null);
    const imageRef = useRef();

    const imageUrl = "http://localhost:8080/test/image/astronaut.png";

    /**
     * Ikke brukt
     */
    const fetchImage = async () => {
        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImage(imageObjectURL);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', file);
        axios.post("http://localhost:8080/test/upload", formData).then(window.location.href = `/`);
    }

    const handleDisplayImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setDisplayImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

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
                    {image && <img src={imageUrl} alt='Astronaut' className='testImage' />}
                    <p>This image is uploaded from the server</p>
                </div>
            </div>
            <div className='TestPageElement'>
                <h1>Upload test</h1>
                <div className='TestContent'>
                    <input type='file' onChange={handleFileChange} className='testFileInput' />
                    <button onClick={handleUpload} className='testFileButton'>Upload</button>
                </div>
            </div>
            <div className='TestPageElement'>
                <h1>Preview image</h1>
                <div className='TestContent'>
                    {displayImage && <img src={displayImage} alt='preview' className='uploadFileDisplay' />}
                    <input type='file' accept='image/*' onChange={handleDisplayImage} className='testFileDisplayInput' />
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