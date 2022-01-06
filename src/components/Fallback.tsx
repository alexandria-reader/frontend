/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Nav from './Nav';

const fallback = require('../assets/fallback.jpg');

export default function Fallback({ resetErrorBoundary }: { resetErrorBoundary: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <div>
       <Nav />
      <div className="bg-white text-black overflow-hidden relative lg:flex lg:items-center">
      <div className="w-1/2 py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
      <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
        <span className="block">
          It's not you, it's us 🥺🙊🤭
      </span>
      </h2>
      {/* <p className="text-md mt-4 text-black-400">Error: {error.message}</p> */}
      <p className="text-md mt-4 text-gray-400">
          Try the home page again.
      </p>
        <div className="lg:mt-0 lg:flex-shrink-0">
          <div className="mt-12 inline-flex rounded-md shadow">
            <Link to="/texts"><button onClick={resetErrorBoundary} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Go back home
            </button></Link>
         </div>
        </div>
      </div>
      <div className="flex items-center gap-8 p-4 lg:p-10 w-1/2 ">
        <img src={fallback} className="rounded-lg mt-14" alt="Page Error"/>
      </div>
  </div>
  <Footer />
</div>
  );
}
