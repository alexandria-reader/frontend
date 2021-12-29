import getToken from '../utils/getToken';

export default function Home() {
  const tokenObj = getToken();

  return (
    <div className='home-page'>
     Home
     <div> { tokenObj
       ? (`${tokenObj.username} is logged in`) : 'You are not logged in.'
     } </div>
     <p>Insert all the awesome information about the app here.</p>
    </div>
  );
}
