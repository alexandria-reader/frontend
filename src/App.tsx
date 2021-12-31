import { Outlet } from 'react-router';
import './App.css';
import Home from './components/Home';
import Nav from './components/Nav';
import LoggedOutNav from './components/LoggedOutNav';
import getToken from './utils/getToken';

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
        <LoggedOutNav />
      <Home />
    </>}
  </div>
  );
}

export default App;

