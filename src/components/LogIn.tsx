import { useRecoilValue } from 'recoil';
import { userState } from '../states/recoil-states';
import LoginForm from './loginForm';

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
