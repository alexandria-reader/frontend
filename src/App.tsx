import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useLocalStorage from 'use-local-storage';
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
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }

  const fetchUserInfo = async function () {
    if (!user) {
      const localToken = getToken();

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
    <div className="min-h-screen min-w-full text-primary bg-secondary flex flex-col justify-between  mb-auto">
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}
        onReset={() => setErrorState(false)} resetKeys={[errorState]}>
        <Nav />
        {user ? <main className='container mx-auto mb-auto'>
          <Outlet />
        </main> : <Outlet />}
        <Footer />
      </ErrorBoundary>
  </div>
  );
}

export default App;

