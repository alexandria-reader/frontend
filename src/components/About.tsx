import getToken from '../utils/getToken';

export default function About() {
  const tokenObj = getToken();

  return (
    <div>
     About
     <div> { tokenObj
       ? (`${tokenObj.username} is logged in`) : 'You are not logged in.'
     } </div>
    </div>
  );
}
