import { Navigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { userState } from '../states/recoil-states';

import Hero from './home/Hero';
import HowItWorks from './home/HowItWorks';
import FAQ from './home/FAQ';
import DemoLink from './home/DemoLink';

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
              <DemoLink />
              <FAQ />
            </>
          : <Navigate to="/texts"/>
      } </>
  // </div>
  );
}
