/* eslint-disable max-len */
const lightDarkGif = require('../assets/light-dark.gif');
const setTranslationGif = require('../assets/set-translation.gif');
const phraseSelectionGif = require('../assets/phrase-selection.gif');
const settingsNameGif = require('../assets/setting_name.gif');
const settingsPasswordGif = require('../assets/setting_pw.gif');
const settingsLangGif = require('../assets/setting_lang.gif');
const signUpGif = require('../assets/sign-up.gif');

const screenshots = [
  { heading: 'Sign Up', gif: signUpGif },
  { heading: 'Add translation', gif: setTranslationGif },
  { heading: 'Select phrases', gif: phraseSelectionGif },
  { heading: 'Update user name and email in Settings', gif: settingsNameGif },
  { heading: 'Update password in Settings', gif: settingsPasswordGif },
  { heading: 'Update user languages in Settings', gif: settingsLangGif },
  { heading: 'Light and dark mode', gif: lightDarkGif },
];

const Screenshot = function({ heading, gif }: { heading: string, gif: string }) {
  return (
    <div className="dark:bg-gray-800 rounded-md">
      <div className="text-center justify-center pt-20 pb-10">
        <p className="mr-8 w-full text-3xl font-extrabold leading-9 pb-10">
          {heading}
        </p>
        <div className="mr-8 w-full text-3xl font-extrabold leading-9">
          <img alt="profile" src={gif} className="text-gray-600 dark:text-white w-full text-center text-lg md:text-3xl"/>
        </div>
      </div>
    </div>
  );
};

export default function Screenshots() {
  return (
    <>
    <div className=" py-8 mx-auto p-8 w-2/3">
      <h1 className="text-3xl font-extrabold m-auto text-center pt-20 pb-20">
        How Alexandria works
      </h1>
      {screenshots.map((screenshot) => <Screenshot key={screenshot.heading} heading={screenshot.heading} gif={screenshot.gif} />)}

    </div>
    </>
  );
}
