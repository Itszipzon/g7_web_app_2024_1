import Test from './pages/Test/Test';
import { Route, Routes } from 'react-router';
import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/test' element={<Test/>} />
      </Routes>
    </>
  );
}

export default App;
