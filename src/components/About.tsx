import { useRecoilValue } from 'recoil';
import { userState } from '../states/recoil-states';


export default function About() {
  const user = useRecoilValue(userState);

  return (
    <div>
     About
     <div> { user
       ? (`${user.username} is logged in`) : 'You are not logged in.'
// =======
// import { useNavigate } from 'react-router';
// import getToken from '../utils/getToken';
// import HowItWorks from './home/HowItWorks';
// import FAQ from './home/FAQ';

// export default function About() {
//   const tokenObj = getToken();
//   const navigate = useNavigate();

//   return (
//     <div className='home-page'>
//      <div> { tokenObj
//        ? navigate('/texts')
//        : <div>
//           <HowItWorks />
//           <FAQ />
//         </div>
// >>>>>>> main
     } </div>
    </div>
  );
}
