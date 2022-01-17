import HowItWorks from './home/HowItWorks';
import FAQ from './home/FAQ';
import Screenshots from './Screenshots';

const logo = require('../assets/logo/logo-light.png');

export default function About() {
  return (
    <div className='home-page'>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20">
        <div className="py-12 md:py-6">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <img src={logo} alt="Alexandria logo" className="mx-auto h-40 w-auto pb-8"/>
            <p className="text-xl text-secondary">Research shows language acquisition occurs when we comprehend messages alongside its surrounding context.</p>
            <p className="mt-10 text-xl text-secondary">This is where Alexandria comes in.</p>
          </div>
        </div>
      </div>
      <HowItWorks />
      <Screenshots />
      <FAQ />
    </div>
  );
}
