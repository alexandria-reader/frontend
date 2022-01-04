import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../states/recoil-states';

import Benefits from './home/Benefits';
import HowItWorks from './home/HowItWorks';
import FAQ from './home/FAQ';

export default function Home() {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <div className='home-page'>
     <div> { user
       ? navigate('/texts')
       : <div>
          <Benefits />
          <HowItWorks />
          <FAQ />
        </div>
     } </div>
    </div>
  );
}
