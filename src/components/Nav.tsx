import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import logOut from '../utils/logOut';
import Languages from './Languages';

const logo = require('../assets/logo.png');

export default function Nav() {
  const [showLanguages, setShowLanguages] = useState(false);

  return (
    <div className='flex flex-row justify-between h-20 p-2 border'>
      <><ul className='flex flex-row justify-between items-center w-fit'>
        <li className='m-2'><NavLink to='/texts'><img src={logo} alt="Alexandria logo" width="100px" height="100px" /></NavLink></li>
        <li className='m-2'><NavLink to='/texts'>Texts</NavLink></li>
        <li className='m-2'><NavLink to='/words'>Words</NavLink></li>
        <li className='m-2'><NavLink to='/settings'>Setting</NavLink></li>
        <li className='m-2'><NavLink to='/' onClick={() => logOut()}>Log out</NavLink></li>
      </ul>
      <ul className='flex flex-row items-center m-4'>
        <li className=''>
          <p onClick={() => setShowLanguages(true)}>Languages</p>
          {showLanguages && <Languages setShowLanguages={setShowLanguages} />}
        </li>
      </ul></>
    </div>
  );
}
