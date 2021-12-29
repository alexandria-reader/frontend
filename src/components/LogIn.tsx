import Nav from './Nav';
import LoginForm from './loginForm';
import getToken from '../utils/getToken';

export default function LogIn() {
  const tokenObj = getToken();
  return (
    <div>
     <Nav />
     Log in
     <div> { tokenObj
       ? (`${tokenObj.username} is logged in`) : (
        <LoginForm />)}
      </div>
    </div>
  );
}
