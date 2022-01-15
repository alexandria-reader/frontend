import { Navigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { userState } from '../states/recoil-states';

import Hero from './home/Hero';
import HowItWorks from './home/HowItWorks';
import FAQ from './home/FAQ';

export default function Home() {
  const user = useRecoilValue(userState);

  return (
  // <div className='home-page'>
     <>
     {
        !user
          ? <>
              <Hero />
              <HowItWorks />
              <FAQ />
            </>
          : <Navigate to="/texts"/>
      } </>
  // </div>
  );
}
