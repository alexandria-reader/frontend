/* eslint-disable max-len */

// const logo = require('../../assets/logo/logo-light.png');
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudUploadAlt, faSearch, faAdjust, faCommentDots, faCheck, faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons';

export default function HowItWorks() {
  return (
    <div>
      {/* <a id="how-it-works" /> */}
      <section className="relative text-primary">

      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 top-1/4 md:mt-24 lg:mt-0 pointer-events-none bg-gradient-to-b from-[#6a007b] to-[#167cbd]" aria-hidden="true"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-6">

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-6 items-stretch md:grid-cols-2 lg:grid-cols-3 md:max-w-2xl lg:max-w-none">

            {/* 1st item */}
            <div className="relative flex flex-col items-center p-6 bg-tertiary rounded shadow-xl py-8">
              <FontAwesomeIcon icon={faCloudUploadAlt} size='3x' style={{ color: '#0084c7' }}/>
              <p className="text-xl font-bold leading-snug tracking-tight mt-3 mb-1">Upload text</p>
              <p className="text-secondary text-center">Add a text you are interested in reading, such as a newspaper article, or a story, in the language you are actively learning.</p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center p-6 bg-tertiary rounded shadow-xl py-8">
            <FontAwesomeIcon icon={faSearch} size='3x' style={{ color: '#0084c7' }}/>
              <p className="text-xl font-bold leading-snug tracking-tight mb-1 mt-3">Look up words</p>
              <p className="text-secondary text-center">Read through the text and click on any words you don't know or aren't sure about. Multiple dictionaries are available for translation.</p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center p-6 bg-tertiary rounded shadow-xl py-8">
              <FontAwesomeIcon icon={faAdjust} size='3x' style={{ color: '#0084c7' }}/>
              <p className="text-xl font-bold leading-snug tracking-tight mt-3 mb-1">Set word status</p>
              <p className="text-secondary text-center">Adding a translation automatically marks a word as "learning". But feel free to change it to "familiar" or "learned".</p>
            </div>

            {/* 4th item */}
            <div className="relative flex flex-col items-center p-6 bg-tertiary rounded shadow-xl py-8">
              <FontAwesomeIcon icon={faCommentDots} size='3x' style={{ color: '#0084c7' }}/>
              <p className="text-xl font-bold leading-snug tracking-tight mt-3 mb-1">Apply translation in context</p>
              <p className="text-secondary text-center">Add translations based on the word's current context. You can always add another translation for the same word based on a different context later.</p>
            </div>

            {/* 5th item */}
            <div className="relative flex flex-col items-center p-6 bg-tertiary rounded shadow-xl py-8">
              <FontAwesomeIcon icon={faCheck} size='3x' style={{ color: '#0084c7' }}/>
              <p className="text-xl font-bold leading-snug tracking-tight mt-3 mb-1">Adjust word status</p>
              <p className="text-secondary text-center">Any words you have previously highlighted will be highlighted based on their status. Feel free to update a word's status as you become more familiar with the word.</p>
            </div>

            {/* 6th item */}
            <div className="relative flex flex-col items-center p-6 bg-tertiary rounded shadow-xl py-8">
              <FontAwesomeIcon icon={faChalkboardTeacher} size='3x' style={{ color: '#0084c7' }}/>
              <p className="text-xl font-bold leading-snug tracking-tight mt-3 mb-1">Review word list</p>
              <p className="text-secondary text-center">Word's you have highlighted are available for review at your convenience. They are shown along with your translation and the sentence the word was found in.</p>
            </div>

          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
