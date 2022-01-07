import HowItWorks from './home/HowItWorks';
import FAQ from './home/FAQ';

export default function About() {
  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8'>
          <div className='pb-5 border-b border-gray-200 flex items-center justify-between'>
            <h2 className='text-lg leading-6 font-medium text-gray-900'>About Alexandria</h2>
          </div>
        </div>
      </div>
      <div className='home-page'>
        <HowItWorks />
        <FAQ />
      </div>
    </>
  );
}
