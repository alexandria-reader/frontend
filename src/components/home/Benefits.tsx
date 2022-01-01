export default function Benefits() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-20 md:pb-10">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="md:text-8xl font-extrabold leading-tighter tracking-normal mb-8" data-aos="zoom-y-out">Learn by reading <br></br><span className="bg-clip-text text-transparent bg-gradient-to-r from-[#167cbd] to-[#6a007b]">what you enjoy</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8 tracking-normal" data-aos="zoom-y-out" data-aos-delay="150">Upload text that you enjoy, highlight the words you want to learn. Rinse and repeat.</p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-10 rounded mx-10"><a href="/login">Sign in</a></button>
                <br></br>
                </div>
                <div>
                  {/* <a className="btn text-white bg-gray-900 hover:bg-gray-800
                  w-full sm:w-auto sm:ml-4" href="#0">Sign up</a> */}
                  <button className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-10 rounded"><a href="/signup">Sign up</a></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
