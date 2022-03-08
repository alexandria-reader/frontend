import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
// import useLocalStorage from 'use-local-storage';
import { userState } from './states/recoil-states';
import Fallback from './components/Fallback';
import './App.css';
import Nav from './components/nav/Nav';
import Footer from './components/nav/Footer';
import getToken from './utils/getToken';
import userServices from './services/users';

function App() {
  const [user, setUser] = useRecoilState(userState);
  const [errorState, setErrorState] = useState(false);

  // const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // const [theme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === '"dark"') {
      if (!document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    } else if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  toggleTheme();

  const fetchUserInfo = async function () {
    if (!user) {
      const localToken = getToken();

      if (typeof localToken === 'string') {
        try {
          const tokenUser = await userServices.getUserFromToken(localToken);
          setUser(tokenUser);
        } catch (error) {
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
  });

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
