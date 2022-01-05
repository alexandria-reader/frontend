import { useRecoilValue } from 'recoil';
import { userState } from '../states/recoil-states';
import HowItWorks from './home/HowItWorks';
import FAQ from './home/FAQ';

export default function About() {
  const user = useRecoilValue(userState);

  return (
    <div>
     About
     <div> { user && (<div className='home-page'>
           <HowItWorks />
           <FAQ />
         </div>)
     } </div>
    </div>
  );
}
