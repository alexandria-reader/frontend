/* eslint-disable max-len */
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from './states/recoil-states';
import Fallback from './components/Fallback';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import getToken from './utils/getToken';
import userServices from './services/users';

function App() {
  const [user, setUser] = useRecoilState(userState);
  const [errorState, setErrorState] = useState(false);
  const fetchUserInfo = async function () {
    if (!user) {
      const localToken = getToken();
      console.log('Checking for token');

      if (typeof localToken === 'string') {
        const tokenUser = await userServices.getUserFromToken(localToken);

        if (tokenUser.username) {
          setUser(tokenUser);
        } else {
          localStorage.removeItem('alexandria-user-token');
        }
      }
    }
  };

  const errorHandler = (error: unknown, errorInfo: unknown) => {
    console.log('Logging', error, errorInfo);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="min-h-screen min-w-full bg-gray-100 flex flex-col justify-between">
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler} onReset={() => setErrorState(false)} resetKeys={[errorState]}>
        <Nav />
        <main className='container mx-auto mb-auto'>
          <Outlet />
        </main>
        <Footer />
      </ErrorBoundary>
  </div>
  );
}

export default App;

