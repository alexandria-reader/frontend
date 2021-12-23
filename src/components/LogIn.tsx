import { useContext, useState } from 'react';
import Nav from './Nav';
import UserContext from '../contexts/UserContext';
// import { login } from '../utils/login';
import Login from '../utils/loginForm';

export default function LogIn() {
  const { user, setUser } = useContext(UserContext);
  const [token, setToken] = useState();
  console.log(user);
  return (
    <div>
     <Nav />
     {/* {console.log(token.username)} */}
     { token && user
     // FIXME: token exists but can't seem to get the user object in, also can't parse token object
     // TODO: loginForm is able to push the data into local storage, but before this page renders
       ? ('You are logged in')
       : (
       <Login setToken={setToken} setUser={setUser}/>
       )
     }
    </div>
  );
}
