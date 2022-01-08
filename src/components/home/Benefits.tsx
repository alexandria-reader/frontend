/* eslint-disable max-len */
// import undraw from '../../assets/undraw_researching.svg';
// eslint-disable-next-line global-require
// const undraw = require('../../assets/undraw.svg') as String;
import svg from '../../assets/undraw-mh2.svg';

export default function Benefits() {
  return (
    <>
      {/* Hero content */}
      <div className="hero h-screen px-4 py-10 md:px-20 md:py-10">
        <div className="items-center h-full flex flex-col md:flex-row ">
        {/* Section header */}
          <div className=" flex-1 xl:py-28 flex justify-between h-max flex-col gap-6">
            <h1 className="text-4xl text-center md:text-left xl:text-6xl lg:text-5xl md:text-4xl sm:text-6xl font-extrabold leading-tighter tracking-normal" data-aos="zoom-y-out">Alexandria:<br />Learn languages by<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#167cbd] to-[#6a007b]">reading what you enjoy</span>
            </h1>
            <div className="max-w-3xl">
              <p className="text-xl text-center md:text-left text-gray-600 tracking-normal" data-aos="zoom-y-out" data-aos-delay="150">Upload texts. Translate words. Review.</p>
            </div>
            <div className="flex justify-center flex-row" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <a href="/signup"><button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 bg-sky-600 transition duration-150 ease-in-out hover:bg-sky-500 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-sky-600 py-2 sm:py-4 text-sm">Sign up</button></a>
                </div>
                <div>
                  <a href="#how-it-works" onClick={(event) => {
                    event.preventDefault();
                    document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }}><button className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 bg-transparent transition duration-150 ease-in-out hover:border-sky-500 lg:text-xl lg:font-bold  hover:text-sky-500 rounded border border-sky-600 text-sky-600 px-4 sm:px-10 py-2 sm:py-4 text-sm">Learn more</button></a>
                </div>
              </div>
          </div>
        <div className=" flex-1 ">
          <img src={svg} alt="" />
        </div>
      </div>
    </div>
  </>
  );
}
