import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import LoginPage from './pages/userpages/LoginPage';
import RegisterPage from './pages/userpages/RegisterPage';
import AdminPage from './pages/admin/AdminPage';
import Search from './pages/Search';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/admin' element={<AdminPage/>} />
      </Routes>
    </>
  );
}

export default App;
