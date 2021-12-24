// import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
// import UserContext from '../contexts/UserContext';
import logOut from '../utils/logOut';
import getToken from '../utils/getToken';

const logo = require('../assets/logo.png');

export default function Nav() {
  // const { user, setUser } = useContext(UserContext);
  const tokenObj = getToken();

  return (
    <div>
      <div>
        <ul>
          <NavLink to='/'><img src={logo} alt="Alexandria logo" width="100px" height="100px" /></NavLink>
          <li><NavLink to='/texts'>Texts</NavLink></li>
          <li><NavLink to='/words'>Words</NavLink></li>
          {tokenObj ? (
            ''
          ) : (
            <li><NavLink to='/about'>About</NavLink></li>
          )}
          {tokenObj ? (
            <li><NavLink to='/' onClick={() => logOut()}>Log out</NavLink></li>
          ) : (
            <li><NavLink to='/login'>Log in</NavLink></li>
          )}
          {tokenObj ? (
             <li><NavLink to='/settings'>Setting</NavLink></li>
          ) : (
            <li><NavLink to='/signup'>Sign up</NavLink></li>
          )}
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
