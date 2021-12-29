import LoginForm from './loginForm';
import getToken from '../utils/getToken';

export default function LogIn() {
  const tokenObj = getToken();

  return (
    <div>
     Log in
     <div> { tokenObj
       ? (`${tokenObj.username} is logged in`) : (
        <LoginForm />)}
      </div>
    </div>
  );
}
