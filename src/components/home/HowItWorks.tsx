/* eslint-disable max-len */

// const logo = require('../../assets/logo/logo-light.png');
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudUploadAlt, faSearch, faAdjust, faCommentDots, faCheck, faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons';

export default function HowItWorks() {
  return (
    <div>
      <a id="how-it-works" />
      <section className="relative">

      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 top-1/4 md:mt-24 lg:mt-0 pointer-events-none bg-gradient-to-b from-[#6a007b] to-[#167cbd]" aria-hidden="true"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-6">

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">

            {/* 1st item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl py-8">
              <FontAwesomeIcon icon={faCloudUploadAlt} size='3x' style={{ color: '#0084c7' }}/>
              <h4 className="text-xl font-bold leading-snug tracking-tight mt-3 mb-1">Upload text</h4>
              <p className="text-gray-600 text-center">Add a piece of text you are interested in reading, in the language you are actively learning. For example, a piece of newspaper article, or a story.</p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl py-8">
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Look up words</h4>
              <p className="text-gray-600 text-center">Go through the text and click on words you don't know, or are not sure about. Multiple dictionaries are available for translation.</p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl py-8">
              <FontAwesomeIcon icon={faAdjust} size='3x' style={{ color: '#0084c7' }}/>
              <h4 className="text-xl font-bold leading-snug tracking-tight mt-3 mb-1">Set word status</h4>
              <p className="text-gray-600 text-center">Inititally marked words are marked with a status of "Learning". But feel free to adjust it based on your level of familiarity with the word.</p>
            </div>

            {/* 4th item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl py-8">
              <FontAwesomeIcon icon={faCommentDots} size='3x' style={{ color: '#0084c7' }}/>
              <h4 className="text-xl font-bold leading-snug tracking-tight mt-3 mb-1">Apply translation in context</h4>
              <p className="text-gray-600 text-center">Based on surrounding context, add the translation that fits best. You can always add another translation for the same word based on a different context later.</p>
            </div>

            {/* 5th item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl py-8">
              <FontAwesomeIcon icon={faCheck} size='3x' style={{ color: '#0084c7' }}/>
              <h4 className="text-xl font-bold leading-snug tracking-tight mt-3 mb-1">Adjust word status</h4>
              <p className="text-gray-600 text-center">If previously marked words exist in your account, they are shown based on "word status". Adjust status based on your level of familiarity with the word.</p>
            </div>

            {/* 6th item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl py-8">
              <FontAwesomeIcon icon={faChalkboardTeacher} size='3x' style={{ color: '#0084c7' }}/>
              <h4 className="text-xl font-bold leading-snug tracking-tight mt-3 mb-1">Review word list</h4>
              <p className="text-gray-600 text-center">Marked words are available for review at your convenience. Words are presented with translation and surrounding context to ensure maximum retention.</p>
            </div>

          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
