import Nav from './Nav';
import LoginForm from '../utils/loginForm';
import getToken from '../utils/getToken';

export default function LogIn() {
  const tokenObj = getToken();
  return (
    <div>
     <Nav />
     Home
     <div> { tokenObj
       ? (`${tokenObj.email} is logged in`) : (
        <LoginForm />)}
      </div>
    </div>
  );
}
