import { Link } from 'react-router-dom';
import './css/UserMenuNav.css';

function UserMenuNav({
  isadmin = false,
  name = ""
}) {

  const handleLogOut = () => {
    localStorage.removeItem("UIDtoken");
    window.location.reload();
  }

  return (
    <div className="user-menu-nav">
      <ul className='users'>
        <li>Hei {name}</li>
      </ul>
      {isadmin ?
      <div className='admin-menu'>
        <Link to="/admin" className='link'>
          Admin Panel
        </Link>
      </div>
      :
      null}
      <div className='user-logout-button'>
        <button onClick={handleLogOut}>Log out</button>
      </div>
    </div>
  );
}

export default UserMenuNav;