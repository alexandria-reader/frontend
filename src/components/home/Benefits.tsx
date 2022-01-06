export default function Benefits() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-20 md:pb-4">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-4xl md:text-8xl sm:text-6xl font-extrabold leading-tighter tracking-normal mb-16" data-aos="zoom-y-out">Learn languages by<br></br><span className="bg-clip-text text-transparent bg-gradient-to-r from-[#167cbd] to-[#6a007b]">reading what you enjoy</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-16 tracking-normal" data-aos="zoom-y-out" data-aos-delay="150">Upload texts. Highlight words you want to learn. Review regularly.</p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <a href="/login"><button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-10 rounded mx-10 my-3">Sign in</button></a>
                </div>
                <div>
                  <a href="/signup"><button className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-10 rounded mx-10 my-3">Sign up</button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
