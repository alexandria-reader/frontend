import { Location, Navigate, useLocation } from 'react-router';
import { useRecoilValue } from 'recoil';
import { userState } from '../states/recoil-states';
import LoginForm from './login/LoginForm';

export default function LogIn() {
  const user = useRecoilValue(userState);
  const location = useLocation();
  const state = location.state as { from: Location };
  const from = state ? state.from?.pathname : '/texts';

  return (
    <>
    {
      !user
        ? <main className='container mx-auto mb-auto'>
            <LoginForm from={from} />
          </main>
        : <Navigate to={from} />
    }
    </>
  );
}
