import Test from './pages/Test/Test';
import { Route, Routes } from 'react-router';
import './App.css';
import Home from './pages/Home';
import TestCar from './pages/Test/TestCar';
import TestCarPage from './pages/Test/TestCarPage';
import LoginPage from './pages/userpages/LoginPage';
import RegisterPage from './pages/userpages/RegisterPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/test' element={<Test/>} />
        <Route path='/testcar' element={<TestCar />} />
        <Route path='/testcarpage/:name' element={<TestCarPage />} />
      </Routes>
    </>
  );
}

export default App;
