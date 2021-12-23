import { useContext } from 'react';
import Nav from './Nav';
import UserContext from '../contexts/UserContext';
// import { login } from '../utils/login';
import LoginForm from '../utils/loginForm';

export default function LogIn() {
  const { user } = useContext(UserContext);
  // const [token, setToken] = useState();
  // console.log(user);
  return (
    <div>
     <Nav />
     { user
       ? (`${user.email} is logged in`)
       : (
       <LoginForm />
       )
     }
    </div>
  );
}
