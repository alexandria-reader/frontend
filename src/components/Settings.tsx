import { useContext } from 'react';
import Nav from './Nav';
import UserContext from '../contexts/UserContext';

export default function Settings() {
  const { user } = useContext(UserContext);
  return (
    <div>
     <Nav />
     Setting
     <div> { user
       ? (`${user.email} is logged in`) : 'You are not logged in.'
     } </div>
    </div>
  );
}
