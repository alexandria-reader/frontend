const lightDarkGif = require('../assets/light-dark.gif');
const setTranslationGif = require('../assets/set-translation.gif');
const phraseSelectionGif = require('../assets/phrase-selection.gif');
const settingsNameGif = require('../assets/settings_name.gif');
const settingsPasswordGif = require('../assets/settings_pw.gif');
const settingsLangGif = require('../assets/settings_lang.gif');
const signUpGif = require('../assets/sign_up.gif');

export default function Screenshots() {
  return (
    <div className="dark:bg-gray-800 mx-auto p-8 w-4/5">
        <p className="text-3xl font-extrabold m-auto text-center pt-20 pb-20">How Alexandria works
        </p>
        <div className="md:flex text-center justify-center pt-20">
          <div className="mr-8 w-full md:w-1/2 text-3xl font-extrabold leading-9">
            <img alt="profile" src={signUpGif} className="text-gray-600 dark:text-white w-full m-auto text-center text-lg md:text-3xl"/>
          </div>
          <h2 className="mr-8 w-full md:w-1/2 text-3xl font-extrabold leading-9">
            Sign Up
          </h2>
        </div>
        <div className="md:flex text-center justify-center pt-20">
          <h2 className="mr-8 w-full md:w-1/2 text-3xl font-extrabold leading-9  ">
            Light and dark mode
          </h2>
          <div className="mr-8 w-full md:w-1/2 text-3xl font-extrabold leading-9">
            <img alt="profile" src={lightDarkGif} className="text-gray-600 dark:text-white w-full m-auto text-center text-lg md:text-3xl"/>
          </div>
        </div>
        <div className="md:flex text-center justify-center pt-20">
          <div className="mr-8 w-full md:w-1/2 text-3xl font-extrabold leading-9">
            <img alt="profile" src={setTranslationGif} className="text-gray-600 dark:text-white w-full m-auto text-center text-lg md:text-3xl"/>
          </div>
          <h2 className="mr-8 w-full md:w-1/2 text-3xl font-extrabold leading-9">
            Add translation
          </h2>
        </div>
        <div className="md:flex text-center justify-center pt-20">
          <h2 className="w-full md:w-1/2 text-3xl font-extrabold justify-right">
          Select phrases
          </h2>
          <div className="mr-8 w-full md:w-1/2 text-3xl font-extrabold leading-9">
            <img alt="profile" src={phraseSelectionGif} className="text-gray-600 dark:text-white w-full m-auto text-center text-lg md:text-3xl"/>
          </div>
        </div>
        <div className="md:flex text-center justify-center pt-20">
          <div className="mr-8 w-full md:w-1/2 text-3xl font-extrabold leading-9">
            <img alt="profile" src={settingsNameGif} className="text-gray-600 dark:text-white w-full m-auto text-center text-lg md:text-3xl"/>
          </div>
          <h2 className="mr-8 w-full md:w-1/2 text-3xl font-extrabold leading-9">
            Update user name and email in Settings
          </h2>
        </div>
        <div className="md:flex text-center justify-center pt-20">
          <h2 className="w-full md:w-1/2 text-3xl font-extrabold justify-right">
          Update password in Settings
          </h2>
          <div className="mr-8 w-full md:w-1/2 text-3xl font-extrabold leading-9">
            <img alt="profile" src={settingsPasswordGif} className="text-gray-600 dark:text-white w-full m-auto text-center text-lg md:text-3xl"/>
          </div>
        </div>
        <div className="md:flex text-center justify-center pt-20">
          <div className="mr-8 w-full md:w-1/2 text-3xl font-extrabold leading-9">
            <img alt="profile" src={settingsLangGif} className="text-gray-600 dark:text-white w-full m-auto text-center text-lg md:text-3xl"/>
          </div>
          <h2 className="mr-8 w-full md:w-1/2 text-3xl font-extrabold leading-9">
            Update user languages in Settings
          </h2>
        </div>
    </div>
  );
}
