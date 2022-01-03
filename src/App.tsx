import { Outlet } from 'react-router';
import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';
import { userState } from './states/recoil-states';

import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import getToken from './utils/getToken';
import userServices from './services/users';

function App() {
  const setUser = useSetRecoilState(userState);

  const fetchUserInfo = async function () {
    const localToken = getToken();

    if (typeof localToken === 'string') {
      const tokenUser = await userServices.getUserFromToken(localToken);
      if (tokenUser.username) {
        setUser({ ...tokenUser, token: localToken });
      } else {
        localStorage.removeItem('alexandria-user-token');
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="min-h-screen min-w-full bg-gray-100 flex flex-col justify-between">
          <Nav />
          <main className='container mx-auto mb-auto'>
            <Outlet />
          </main>
          <Footer />
  </div>
  );
}

export default App;

