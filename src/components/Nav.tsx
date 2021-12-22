import { UserContext } from '../contexts/UserContext';
import React, {useContext} from 'react'
import { NavLink, Outlet} from 'react-router-dom';
const logo = require("../assets/logo.png")

export default function Nav() {
  const {user, setUser} = useContext(UserContext);

  return (
    <div>
      <div>
        <ul>
          <NavLink to='/'><img src={logo} alt="Alexandria logo" width="100px" height="100px" /></NavLink>
          <li><NavLink to='/texts'>Texts</NavLink></li>
          <li><NavLink to='/words'>Words</NavLink></li>
          {user ? (
             ''
          ) : (
            <li><NavLink to='/about'>About</NavLink></li>
          )}
          {user ? (
            <li><NavLink to='/' onClick={() => setUser(null)}>Log out</NavLink></li>
          ) : (
            <li><NavLink to='/login'>Log in</NavLink></li>
          )}
          {user ? (
             <li><NavLink to='/settings'>Setting</NavLink></li>
          ) : (
            <li><NavLink to='/signup'>Sign up</NavLink></li>
          )}
        </ul>
      </div>
      <Outlet />
    </div>
  )
}
