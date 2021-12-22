import Nav from './Nav';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { login } from '../utils/login';
import Login from '../utils/loginForm';

export default function LogIn() {
  const {user, setUser} = useContext(UserContext);
  const [token, setToken] = useState();

  return (
    <div>
     <Nav />
     { token ? '' : (
       <Login setToken={setToken} />
      )
     }

     <div>{JSON.stringify(user, null, 2)} is logged in</div>
     <button 
      onClick={async () => {
        const user = await login();
        setUser(user);
      }}
      >
      login
      </button>
    </div>
  )
}
