import { useContext } from 'react';
import Nav from './Nav';
import { UserContext } from '../contexts/UserContext';


export default function About() {
  const { user } = useContext(UserContext);
  return (
    <div>
     <Nav />
     About
     <div> { user
       ? (`${JSON.stringify(user, null, 2)} is logged in`) : 'You are not logged in.'
     } </div>
    </div>
  );
}
