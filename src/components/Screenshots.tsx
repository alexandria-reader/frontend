const lightDarkGif = require('../assets/light-dark.gif');
const setTranslationGif = require('../assets/set-translation.gif');
const phraseSelectionGif = require('../assets/phrase-selection.gif');
const settingsNameGif = require('../assets/setting_name.gif');
const settingsPasswordGif = require('../assets/setting_pw.gif');
const settingsLangGif = require('../assets/setting_lang.gif');
const signUpGif = require('../assets/sign-up.gif');

export default function Screenshots() {
  return (
    <div className="dark:bg-gray-800 mx-auto p-8 w-2/3">
        <p className="text-3xl font-extrabold m-auto text-center pt-20 pb-20">How Alexandria works
        </p>
        <div className="justify-center text-center pb-10">
          <h2 className="mr-8 w-full text-3xl font-extrabold leading-9 pb-10">
            Sign Up
          </h2>
          <div className="text-3xl font-extrabold leading-9">
            <img alt="profile" src={signUpGif} className="text-gray-600 dark:text-white w-full justify-center text-lg md:text-3xl"/>
          </div>
        </div>
        <div className="text-center justify-center pt-20 pb-10">
          <h2 className="mr-8 w-full text-3xl font-extrabold leading-9 pb-10">
            Add translation
          </h2>
          <div className="mr-8 w-full text-3xl font-extrabold leading-9">
            <img alt="profile" src={setTranslationGif} className="text-gray-600 dark:text-white w-full text-center text-lg md:text-3xl"/>
          </div>
        </div>
        <div className="text-center justify-center pt-20 pb-10">
          <h2 className="mr-8 w-full text-3xl font-extrabold leading-9 pb-10">
          Select phrases
          </h2>
          <div className="mr-8 w-full text-3xl font-extrabold leading-9 pb-10">
            <img alt="profile" src={phraseSelectionGif} className="text-gray-600 dark:text-white w-full m-auto text-center text-lg md:text-3xl"/>
          </div>
        </div>
        <div className="text-center justify-center pt-20 pb-10">
          <h2 className="mr-8 w-full text-3xl font-extrabold leading-9 pb-10">
            Update user name and email in Settings
          </h2>
          <div className="mr-8 w-full text-3xl font-extrabold leading-9 pb-10">
            <img alt="profile" src={settingsNameGif} className="text-gray-600 dark:text-white w-full m-auto text-center text-lg md:text-3xl"/>
          </div>
        </div>
        <div className="text-center justify-center pt-20 pb-10">
          <h2 className="mr-8 w-full text-3xl font-extrabold leading-9 pb-10">
          Update password in Settings
          </h2>
          <div className="mr-8 w-full text-3xl font-extrabold leading-9 pb-10">
            <img alt="profile" src={settingsPasswordGif} className="text-gray-600 dark:text-white w-full m-auto text-center text-lg md:text-3xl"/>
          </div>
        </div>
        <div className="text-center justify-center pt-20 pb-10">
          <h2 className="mr-8 w-full text-3xl font-extrabold leading-9 pb-10">
            Update user languages in Settings
          </h2>
          <div className="mr-8 w-full text-3xl font-extrabold leading-9">
            <img alt="profile" src={settingsLangGif} className="text-gray-600 dark:text-white w-full m-auto text-center text-lg md:text-3xl"/>
          </div>
        </div>
        <div className="text-center justify-center pt-20 pb-10">
          <h2 className="mr-8 w-full text-3xl font-extrabold leading-9 pb-10">
            Light and dark mode
          </h2>
          <div className="mr-8 w-full text-3xl font-extrabold leading-9 pb-10">
            <img alt="profile" src={lightDarkGif} className="text-gray-600 dark:text-white w-full m-auto text-center text-lg md:text-3xl"/>
          </div>
        </div>
    </div>
  );
}
