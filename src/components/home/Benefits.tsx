import svg from '../../assets/undraw-mh2.svg';

export default function Benefits() {
  return (
    <>
      {/* Hero content */}
      <div className={`h-screen ${window.innerHeight < 800 ? 'mt-[-4rem]' : 'mt-[-2rem]'}  md:mt-[-2rem] pt-20 md:pt-0 max-w-7xl mx-auto px-4 py-10 md:px-20 md:py-10`}>
        <div className="items-center h-full flex flex-col md:flex-row ">
        {/* Section header */}
          <div className=" flex-1 xl:py-28 flex justify-between h-max flex-col gap-6">
            <h1 className={`${window.innerHeight < 800 ? 'text-4xl' : 'text-5xl'} text-center md:text-left xl:text-6xl lg:text-5xl md:text-4xl sm:text-6xl font-extrabold leading-tighter tracking-normal`} data-aos="zoom-y-out">Alexandria:<br />Learn languages by<br />
              <span className="bg-clip-text block text-transparent bg-gradient-to-r from-[#167cbd] to-[#6a007b]">reading what you enjoy</span>
            </h1>
            <div className="max-w-3xl">
              <p className="text-xl text-center md:text-left text-gray-600 tracking-normal" data-aos="zoom-y-out" data-aos-delay="150">Bring your texts. Translate words. Review.</p>
            </div>
            <div className="flex justify-center flex-row" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <a href="/signup"><button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-700 bg-fuchsia-900 transition duration-150 ease-in-out hover:bg-fuchsia-700 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-fuchsia-900 py-2 sm:py-4 text-md">Sign up</button></a>
                </div>
                <div>
                  <a href="#how-it-works" onClick={(event) => {
                    event.preventDefault();
                    document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }}><button className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 bg-transparent transition duration-150 ease-in-out hover:border-sky-500 lg:text-xl lg:font-bold  hover:text-sky-500 rounded border border-sky-600 text-sky-600 px-4 sm:px-10 py-2 sm:py-4 text-md">Learn more</button></a>
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
