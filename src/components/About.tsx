import HowItWorks from './home/HowItWorks';
import FAQ from './home/FAQ';

const logo = require('../assets/logo/logo-light.png');

export default function About() {
  return (
    <div className='home-page'>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20">
        <div className="py-12 md:py-6">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <img src={logo} alt="Alexandria logo" className="mx-auto h-40 w-auto pb-8"/>
            <p className="text-xl text-gray-600">Languages can be learnt in many different ways. Of of them is by reading texts, translating them word by word at first, and over time becoming more and more familiar with the vocubulary.</p>
            <p className="mt-10 text-xl text-gray-600">Alexandria was build to make this process easier for you.</p>
          </div>
        </div>
      </div>
      <HowItWorks />
      <FAQ />
    </div>
  );
}
