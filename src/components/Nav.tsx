import React from 'react'
import { NavLink, Outlet} from 'react-router-dom';
const logo = require("../assets/logo.png")

export default function Nav() {
  return (
    <div>
       {/* <nav> */}
       <div>
          <ul>
            <NavLink to='/'><img src={logo} alt="Alexandria logo" width="100px" height="100px" /></NavLink>
            <li><NavLink to='/texts'>Texts</NavLink></li>
            <li><NavLink to='/words'>Words</NavLink></li>
            <li><NavLink to='/settings'>Setting</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
         </ul>
          </div>
      {/* </nav> */}
      <Outlet />
    </div>
  )
}
