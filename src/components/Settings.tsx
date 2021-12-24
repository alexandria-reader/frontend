// import { useContext } from 'react';
import Nav from './Nav';
// import UserContext from '../contexts/UserContext';
import getToken from '../utils/getToken';

export default function Settings() {
  // const { user } = useContext(UserContext);
  const tokenObj = getToken();

  return (
    <div>
     <Nav />
     Home
     <div> { tokenObj
       ? (`${tokenObj.email} is logged in`) : 'You are not logged in.'
     } </div>
    </div>
  );
}
