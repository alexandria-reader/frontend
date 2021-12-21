import Nav from './Nav';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { login } from '../utils/login';

export default function LogIn() {
  const {user, setUser} = useContext(UserContext);
  return (
    <div>
     <Nav />
     Home
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
