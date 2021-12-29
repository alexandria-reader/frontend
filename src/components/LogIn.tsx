import { useSetRecoilState } from 'recoil';
import LoginForm from './loginForm';
import getToken from '../utils/getToken';
import { loggedinState } from '../states/recoil-states';

export default function LogIn() {
  const tokenObj = getToken();
  const setLoggedinState = useSetRecoilState(loggedinState);
  setLoggedinState(tokenObj);

  return (
    <div>
     <div> { tokenObj
       ? (`${tokenObj.username} is logged in`) : (
        <LoginForm />)}
      </div>
    </div>
  );
}
