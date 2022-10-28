/* eslint-disable max-len */
const lightDarkGif = require('../../assets/light-dark.mp4');
const setTranslationGif = require('../../assets/set-translation.mp4');
const phraseSelectionGif = require('../../assets/phrase-selection.mp4');
const settingsNameGif = require('../../assets/setting_name.mp4');
const settingsPasswordGif = require('../../assets/setting_pw.mp4');
const settingsLangGif = require('../../assets/setting_lang.mp4');
const signUpGif = require('../../assets/sign-up.mp4');

const screenshots = [
  {
    heading: 'Sign Up',
    paragraph:
      "It's quick and easy to sign up to Alexandria, just add your name, email, a password, and the language you want to learn.",
    gif: signUpGif,
  },
  {
    heading: 'Add translation',
    paragraph:
      "Click on a word, check it's meaning in the dictionary, add a translation and click save. Words with translations are available on the Vocabulary page.",
    gif: setTranslationGif,
  },
  {
    heading: 'Select phrases',
    paragraph:
      'Left click and drag while holding down the mouse button to select a phrase.',
    gif: phraseSelectionGif,
  },
  {
    heading: 'Update user name and email in Settings',
    paragraph:
      'You can easily update your user name or email address by simply entering the new value and clicking save.',
    gif: settingsNameGif,
  },
  {
    heading: 'Update password in Settings',
    paragraph:
      'You can easily change your password by entering your current password and your new password.',
    gif: settingsPasswordGif,
  },
  {
    heading: 'Update user languages in Settings',
    paragraph:
      'Set the language you are learning and the language you want to translate to in Settings.',
    gif: settingsLangGif,
  },
  {
    heading: 'Light and dark mode',
    paragraph:
      'Click on the sun or moon icon to toggle between light mode and dark mode.',
    gif: lightDarkGif,
  },
];

const Screenshot = function({
  heading,
  paragraph,
  gif,
}: {
  heading: string;
  paragraph: string;
  gif: string;
}) {
  return (
    <div className="dark:bg-gray-800 2xl:max-w-4xl max-w-3xl mx-auto bg-white shadow-lg rounded-md p-4 sm:p-6">
      <div className="text-center justify-center flex flex-col gap-6">
        <p className="mr-8 w-full text-2xl sm:text-3xl font-extrabold leading-9">
          {heading}
        </p>
        {paragraph && <p>{paragraph}</p>}
        <div className="w-full text-3xl font-extrabold leading-9">
          <video autoPlay loop muted playsInline>
            {/* <source src="my-animation.webm" type="video/webm"> */}
            <source src={gif} type="video/mp4" />
          </video>
          {/* <img alt="profile" src={gif} className="text-gray-600 dark:text-white w-full text-center text-lg md:text-3xl"/> */}
        </div>
      </div>
    </div>
  );
};

export default function Screenshots() {
  return (
    <>
      <div className=" py-8 mx-auto xl:max-w-6xl max-w-5xl p-8 flex flex-col gap-10">
        <h1 className=" text-4xl sm:text-5xl text-center leading-tighter border-b-gray-300 dark:border-b-gray-700 border-b w-full tracking-normal font-extrabold m-auto py-10">
          How Alexandria works
        </h1>
        {/* <div className=""> */}
        {screenshots.map((screenshot) => (
          <Screenshot
            key={screenshot.heading}
            paragraph={screenshot.paragraph}
            heading={screenshot.heading}
            gif={screenshot.gif}
          />
        ))}
        {/* </div> */}
      </div>
    </>
  );
}
