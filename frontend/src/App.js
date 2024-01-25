import Test from './pages/Test/Test';
import { Route, Routes } from 'react-router';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Test/>} />
      </Routes>
    </>
  );
}

export default App;
