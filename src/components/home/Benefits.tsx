/* eslint-disable max-len */
// import undraw from '../../assets/undraw_researching.svg';
// eslint-disable-next-line global-require
// const undraw = require('../../assets/undraw.svg') as String;
import svg from '../../assets/undraw.svg';

export default function Benefits() {
  return (
    <>
      {/* Hero content */}
      <div className="hero h-screen px-20 py-10">
        <div className="items-center h-full flex flex-col md:flex-row ">
        {/* Section header */}
          <div className=" flex-1 xl:py-28 flex justify-between h-max flex-col gap-6">
            <h1 className="text-3xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-6xl font-extrabold leading-tighter tracking-normal" data-aos="zoom-y-out">Learn languages by<br></br>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#167cbd] to-[#6a007b]">reading what you enjoy</span>
            </h1>
            <div className="max-w-3xl">
              <p className="text-xl text-gray-600 tracking-normal" data-aos="zoom-y-out" data-aos-delay="150">Upload texts. Highlight words you want to learn. Review regularly.</p>
            </div>
            <div className="max-w-xs sm:max-w-none flex flex-row" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <a href="/login"><button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm">Get started</button></a>
                </div>
                <div>
                  <a href="/signup"><button className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-xl lg:font-bold  hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-10 py-2 sm:py-4 text-sm">Learn more</button></a>
                </div>
              </div>
          </div>
        <div className=" md:flex-2 ">
          <img src={svg} alt="" />
        </div>
      </div>
    </div>
  </>
  );
}
