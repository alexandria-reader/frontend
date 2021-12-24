import { useContext } from 'react';
import Nav from './Nav';
import UserContext from '../contexts/UserContext';
// import { login } from '../utils/login';
import LoginForm from '../utils/loginForm';

export default function LogIn() {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem('user');
  let tokenObj;
  if (token) {
    tokenObj = JSON.parse(token);
  }
  const tokenStr = tokenObj.token;
  console.log(user);
  return (
    <div>
     <Nav />
     Home
     <div> { tokenStr
       ? (`${tokenObj.email} is logged in`) : 'You are not logged in.'
     } <LoginForm/> </div>
    </div>
  );
}
