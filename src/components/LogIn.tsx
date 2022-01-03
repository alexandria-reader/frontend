import { useRecoilValue } from 'recoil';
import LoginForm from './loginForm';
import { userState } from '../states/recoil-states';

export default function LogIn() {
  const user = useRecoilValue(userState);

  return (
    <div>
     <div> { user
       ? (`${user.username} is logged in`) : (
        <LoginForm />)}
      </div>
    </div>
  );
}
