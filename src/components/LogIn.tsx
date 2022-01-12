import { Location, useLocation } from 'react-router';
import LoginForm from './LoginForm';

export default function LogIn() {
  const location = useLocation();
  const state = location.state as { from: Location };
  const from = state ? state.from?.pathname : '/texts';

  return (
    <main className='container mx-auto mb-auto'>
      <LoginForm from={from} />
    </main>
  );
}
