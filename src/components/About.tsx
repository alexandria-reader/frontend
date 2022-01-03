/* eslint-disable max-len */
import { useNavigate } from 'react-router';
import getToken from '../utils/getToken';
import HowItWorks from './home/HowItWorks';
import FAQ from './home/FAQ';

export default function About() {
  const tokenObj = getToken();
  const navigate = useNavigate();

  return (
    <div className='home-page'>
     <div> { tokenObj
       ? navigate('/texts')
       : <div>
          <HowItWorks />
          <FAQ />
        </div>
     } </div>
    </div>
  );
}
