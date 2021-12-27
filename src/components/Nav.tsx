import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import logOut from '../utils/logOut';
import getToken from '../utils/getToken';
import Languages from './Languages';

const logo = require('../assets/logo.png');

export default function Nav() {
  const tokenObj = getToken();
  const [showLanguages, setShowLanguages] = useState(false);

  return (
    <div>
      <div>
        <div>
          {tokenObj ? (
            <div className='navBar'>
              <ul>
                <li><NavLink to='/'><img src={logo} alt="Alexandria logo" width="100px" height="100px" /></NavLink></li>
                <li><NavLink to='/texts'>Texts</NavLink></li>
                <li><NavLink to='/words'>Words</NavLink></li>
                <li><NavLink to='/settings'>Setting</NavLink></li>
                <li><NavLink to='/' onClick={() => logOut()}>Log out</NavLink></li>
              </ul>
              <ul>
                <li>
                  <p onClick={() => setShowLanguages(true)}>Click to set Languages</p>
                    {showLanguages && <Languages setShowLanguages={setShowLanguages}/>}
                </li>
              </ul>

            </div>

          ) : (
            <ul>
              <li><NavLink to='/'><img src={logo} alt="Alexandria logo" width="100px" height="100px" /></NavLink></li>
              <li><NavLink to='/login'>Log in</NavLink></li>
              <li><NavLink to='/signup'>Sign up</NavLink></li>
              <li><NavLink to='/about'>About</NavLink></li>
            </ul>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
