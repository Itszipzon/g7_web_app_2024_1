import { useEffect, useRef, useState } from 'react';
import './Test.css';
import axios from 'axios';

function Test() {

    const [testValue, setTestValue] = useState('');
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [displayImage, setDisplayImage] = useState(null);
    const imageRef = useRef();
    const [activeLi, setActiveLi] = useState(null);
    const [activeLiLoop, setActiveLiLoop] = useState(null);
    const [searchItem, setSearchItem] = useState('');
    const [searchContent, setSearchContent] = useState([]);

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

    const list = [
        "Hello",
        "No",
        "Yes",
        "Test",
        "Home",
        "There"
    ];

    let validItems = [];

    const handleSearchInputChange = (e) => {
        let searchTerm = e.target.value;
        let validItemCounter = 0;
        validItems = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].toLowerCase().includes(searchTerm.toLowerCase())) {
                validItems[validItemCounter] = list[i];
                validItemCounter++;
            }
        }
        setSearchItem(searchTerm);
        setSearchContent(validItems);
    }

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

    const handleListActive = (e) => {
        setActiveLi(e);
    }

    const handleListActiveLoop = (e) => {
        setActiveLiLoop(e);
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
                    {/* Use dangerouslySetInnerHTML carefully */}
                    <p dangerouslySetInnerHTML={{ __html: testValue }}></p>
                </div>
            </div>
            <div className='TestPageElement'>
                <h1>The Image Test</h1>
                <div className='TestContent'>
                    {image && (<img src={imageUrl} alt='Astronaut' className='testImage' />)}
                    {image && <p>This image is uploaded from the server</p>}
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
                    <div className='block'>
                        {displayImage && <img src={displayImage} alt='preview' className='uploadFileDisplay' />}
                        <input type='file' accept='image/*' onChange={handleDisplayImage} className='testFileDisplayInput' />
                    </div>
                </div>
            </div>
            <div className='TestPageElement'>
                <h1>Active test</h1>
                <div className='TestContent'>
                    <ul className='testUl'>
                        <li className={activeLi === 1 ? 'testListActive' : ''} onClick={() => handleListActive(1)}>Hello</li>
                        <li className={activeLi === 2 ? 'testListActive' : ''} onClick={() => handleListActive(2)}>Hello</li>
                        <li className={activeLi === 3 ? 'testListActive' : ''} onClick={() => handleListActive(3)}>Hello</li>
                        <li className={activeLi === 4 ? 'testListActive' : ''} onClick={() => handleListActive(4)}>Hello</li>
                    </ul>
                </div>
            </div>
            <div className='TestPageElement'>
                <h1>Active test with loop</h1>
                <div className='TestContent'>
                    <ul className='testUl'>
                        {list.map((s, index) =>
                            <li className={activeLiLoop === index ? 'testListActive' : ''} onClick={() => handleListActiveLoop(index)}>{s}</li>
                        )}
                    </ul>
                </div>
            </div>
            <div className='TestPageElement'>
                <h1>Search test</h1>
                <div className='TestContent'>
                    <div className='searchInputTestHolder'>
                        <input className='searchInput' type='text' value={searchItem} onChange={handleSearchInputChange} placeholder='Search...' />
                        <div className='searchContentDiv'>
                            <ul>
                                {searchItem && searchContent.map((s, i) =>
                                    <li className='searchLi'>{s}</li>
                                )}
                            </ul>
                        </div>
                    </div>
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