import { useEffect, useState } from 'react';
import './Test.css';
import axios from 'axios';
import getUrl from '../../backend';

function Test() {

    const [testValue, setTestValue] = useState('');
    const [file, setFile] = useState(null);
    const [displayImage, setDisplayImage] = useState(null);
    const [activeLi, setActiveLi] = useState(null);
    const [activeLiLoop, setActiveLiLoop] = useState(null);
    const [searchItem, setSearchItem] = useState('');
    const [searchContent, setSearchContent] = useState([]);
    const [connected, setConnected] = useState(false);

    const imageUrl = getUrl() + "test/image/astronaut.png";

    const searchList = [
        "apple", "banana", "orange", "grape", "strawberry", "melon", "kiwi", "peach", "plum", "pear",
        "dog", "cat", "rabbit", "hamster", "turtle", "fish", "bird", "snake", "elephant", "lion",
        "computer", "keyboard", "mouse", "monitor", "printer", "laptop", "tablet", "smartphone", "camera", "headphones",
        "guitar", "piano", "violin", "drums", "trumpet", "flute", "saxophone", "clarinet", "accordion", "harmonica",
        "mountain", "ocean", "river", "forest", "desert", "island", "canyon", "valley", "hill", "plain",
        "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "black",
        "happy", "sad", "angry", "excited", "calm", "surprised", "confused", "proud", "afraid", "curious",
    ];

    const list = [
        "Hello",
        "No",
        "Yes",
        "There",
        "Test",
        "Home"
    ];

    let validItems = [];

    const handleSearchInputChange = (e) => {
        let searchTerm = e.target.value;
        let validItemCounter = 0;
        validItems = [];
        if (searchTerm === "*") {
            validItems = searchList;
        } else {
            for (let i = 0; i < searchList.length; i++) {
                if (searchList[i].toLowerCase().includes(searchTerm.toLowerCase())) {
                    validItems[validItemCounter] = searchList[i];
                    validItemCounter++;
                }
            }
        }
        validItems.sort((a, b) => customSort(a, b, searchTerm));
        setSearchItem(searchTerm);
        setSearchContent(validItems);
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', file);
        axios.post(getUrl() + "test/upload", formData).then(window.location.href = `/`);
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
            axios.get(getUrl() + "test/first", {
            }).then((r) => {
                setTestValue(r.data);
                setConnected(true);
            });
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
                    <div className='testImageGet'>
                        {connected && (<img src={imageUrl} alt='Astronaut' className='testImage' />)}
                        {connected && <p>This image is uploaded from the server</p>}
                    </div>
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
                    <div className='displayImageHolder'>
                        {displayImage && <img src={displayImage} alt='preview' className='uploadFileDisplay' />}
                        <br/>
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
                            <li className={activeLiLoop === index ? 'testListActive' : ''} key={s + index} onClick={() => handleListActiveLoop(index)}>{s}</li>
                        )}
                    </ul>
                </div>
            </div>
            <div className='TestPageElement'>
                <h1>Search test</h1>
                <div className='TestContent'>
                    <div className='searchInputTestHolder'>
                        <input className='searchInput' type='text' value={searchItem} onChange={handleSearchInputChange} placeholder='Search...' />
                        {searchItem && <div className='searchContentDiv'>
                            <ul className='searchUl'>
                                {searchItem && searchContent.map((s, i) => (
                                    <li className='searchLi' key={i}>{s}</li>
                                )
                                )}
                            </ul>
                        </div>}
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

function customSort(a, b, searchString) {
    if (a.startsWith(searchString) && !b.startsWith(searchString)) {
        return -1;
      } else if (!a.startsWith(searchString) && b.startsWith(searchString)) {
        return 1;
      } else {
        return a.localeCompare(b);
      }
}