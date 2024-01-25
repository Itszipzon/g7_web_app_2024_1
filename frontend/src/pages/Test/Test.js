import { useEffect, useState } from 'react';
import './Test.css';
import axios from 'axios';

function Test() {

    const [value, setValue] = useState('');

    useEffect(async () => {
        const http = XMLHttpRequest();
        const url = "/test/first"
        setValue(p);
    });

    return (
        <div className="Test">
            Hei
            {value}
        </div>
      );
}

export default Test;