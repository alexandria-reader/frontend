import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Nav from './components/Nav';
import getToken from './utils/getToken';

// eslint-disable-next-line import/extensions
const logo = require('./assets/logo.png');

function App() {
  const tokenObj = getToken();

  if (tokenObj) {
    return (
      <div className="app">
        <Nav />
        <Outlet />
      </div>
    );
  }

  return (
    <div className="app">
        <ul>
          <li><NavLink to='/'><img src={logo}
          alt="Alexandria logo" width="100px" height="100px" /></NavLink></li>
          <li><NavLink to='/login'>Log in</NavLink></li>
          <li><NavLink to='/signup'>Sign up</NavLink></li>
          <li><NavLink to='/about'>About</NavLink></li>
        </ul>
    <Home />
  </div>
  );
}

export default App;

