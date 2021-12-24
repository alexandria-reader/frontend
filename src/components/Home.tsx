import { useContext } from 'react';
import Nav from './Nav';
import UserContext from '../contexts/UserContext';

export default function Home() {
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
     } </div>
    </div>
  );
}
