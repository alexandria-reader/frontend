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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {tokenObj
        ? <>
          <Nav />
          <main className='container mx-auto'>
            <Outlet />
          </main>
        </>
        : <>
        <ul className='flex border-b h-16 px-4 border-gray-200 flex-row justify-between max-w-7xl items-center'>
          <li><NavLink to='/'><img src={logo}
            alt="Alexandria logo" width="100px" height="100px" /></NavLink></li>
          <li><NavLink to='/login'>Log in</NavLink></li>
          <li><NavLink to='/signup'>Sign up</NavLink></li>
          <li><NavLink to='/about'>About</NavLink></li>
        </ul>
      <Home />
    </>}
  </div>
  );
}

export default App;

