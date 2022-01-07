/* eslint-disable max-len */
// import undraw from '../../assets/undraw_researching.svg';
// eslint-disable-next-line global-require
// const undraw = require('../../assets/undraw.svg') as String;
import svg from '../../assets/undraw.svg';

export default function Benefits() {
  return (
    <>
        {/* Hero content */}
        {/* <div className=""> */}
        <div className="hero">
        <div className="items-center px-20 py-10 flex flex-col md:flex-row ">
          {/* Section header */}
          <div className=" flex-1">
            <h1 className="text-3xl md:text-8xl sm:text-6xl font-extrabold leading-tighter tracking-normal mb-16" data-aos="zoom-y-out">Learn languages by<br></br><span className="bg-clip-text text-transparent bg-gradient-to-r from-[#167cbd] to-[#6a007b]">reading what you enjoy</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-16 tracking-normal" data-aos="zoom-y-out" data-aos-delay="150">Upload texts. Highlight words you want to learn. Review regularly.</p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <a href="/login"><button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm">Get started</button></a>
                  {/* <a href="/login"><button className="bg-sky-600 hover:bg-sky-500 text-white py-2 px-10 rounded mx-10 my-3">Get started</button></a> */}
                </div>
                <div>
                  <a href="/signup"><button className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-xl lg:font-bold  hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-10 py-2 sm:py-4 text-sm">Learn more</button></a>
                  {/* <a href="/signup"><button className="bg-fuchsia-900 hover:bg-fuchsia-700 text-white py-2 px-10 rounded mx-10 my-3">Learn more</button></a> */}
                </div>
                {/* <div>
                  <a href="/login"><button className="bg-sky-600 hover:bg-sky-500 text-white py-2 px-10 rounded mx-10 my-3">Log in</button></a>
                </div>
                <div>
                  <a href="/signup"><button className="bg-fuchsia-900 hover:bg-fuchsia-700 text-white py-2 px-10 rounded mx-10 my-3">Sign up</button></a>
                </div> */}

{/* <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <img src={logo} alt="Alexandria logo" className="mx-auto h-40 w-auto pb-8"/>
            <p className="text-xl text-gray-600">Research shows language acquisition occurs when we comprehend messages alongside its surrounding context. </p>
            <p className="mt-10 text-xl text-gray-600">This is where Alexandria comes in.</p>
          </div> */}
              </div>
            </div>


          </div>
          <div className="  flex-1">
              {/* <p>img</p> */}
              <img src={svg} alt="" />
          </div>
          </div>
        {/* </div> */}
        </div>
      </>
  );
}
