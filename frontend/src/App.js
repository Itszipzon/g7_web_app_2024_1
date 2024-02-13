import Test from './pages/Test/Test';
import { Route, Routes } from 'react-router';
import './App.css';
import Home from './pages/Home';
import TestCar from './pages/Test/TestCar';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/test' element={<Test/>} />
        <Route path='/testcar' element={<TestCar />} />
      </Routes>
    </>
  );
}

export default App;
