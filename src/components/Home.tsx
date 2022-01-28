import { Navigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { userState } from '../states/recoil-states';

import Hero from './home/Hero';
import HowItWorks from './home/HowItWorks';
import FAQ from './home/FAQ';
import SingleText from './texts/SingleText';

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
              <div className='w-screen h-screen p-6 py-16'>
                <p className='text-3xl text-center font-extrabold leading-9'>Demo mode:</p>
                <SingleText />
              </div>
              <FAQ />
            </>
          : <Navigate to="/texts"/>
      } </>
  // </div>
  );
}
