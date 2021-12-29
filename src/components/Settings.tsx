import getToken from '../utils/getToken';

export default function Settings() {
  const tokenObj = getToken();

  return (
    <div>
     Home
     <div> { tokenObj
       ? (`${tokenObj.username} is logged in`) : 'You are not logged in.'
     } </div>
    </div>
  );
}
