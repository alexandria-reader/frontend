import {
  useState, useEffect, Fragment, FormEvent,
} from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { useRecoilState, useRecoilValue } from 'recoil';
import { ExclamationIcon } from '@heroicons/react/outline';
import { Transition, Dialog } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import {
  languageFlagsState, languageNamesState,
  languagesState, userState,
} from '../states/recoil-states';

import userServices from '../services/users';
import languageServices from '../services/languages';

const logo = require('../assets/logo/logo-light.png');
const logoDark = require('../assets/logo/logo-dark.png');

export default function Settings() {
  const [user, setUser] = useRecoilState(userState);
  const [languages, setLanguages] = useRecoilState(languagesState);
  const flags = useRecoilValue(languageFlagsState);
  const names = useRecoilValue(languageNamesState);

  const [openModal, setOpenModal] = useState(false);
  const [usermessage, setUsermessage] = useState('');
  const [showUserMessage, setShowUserMessage] = useState(true);
  const [passwordmessage, setPasswordmessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordIsConfirmed, setPasswordIsConfirmed] = useState(false);
  const [showPasswordmessage, setShowPasswordmessage] = useState(true);
  const [languagemessage, setLanguagemessage] = useState('');
  const [showLanguageMessage, setShowLanguageMessage] = useState(true);

  const navigate = useNavigate();

  const {
    register, formState: { errors }, handleSubmit, setError,
  } = useForm({
    mode: 'onSubmit',
  });

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    setError: setError2,
    reset,
  } = useForm({
    mode: 'onSubmit',
  });

  const {
    register: register3,
    formState: { errors: errors3 },
    handleSubmit: handleSubmit3,
    setError: setError3,
    reset: reset3,
  } = useForm({
    mode: 'onSubmit',
  });

  const getLanguageListFromServer = async function() {
    const dbLanguages = await languageServices.getAllLanguages();
    setLanguages(dbLanguages);
  };

  const changeUserInfo: SubmitHandler<FieldValues> = async(data) => {
    const response = await userServices.updateInfo(data.username, data.email);
    if (typeof response === 'object') {
      setUser(response);
      setUsermessage('User information updated');
    } else {
      setError('email', { type: 'email', message: 'Email already exists.' });
    }
  };

  const changePassword: SubmitHandler<FieldValues> = async (data) => {
    const response = await userServices.updatePassword(data.password1, data.password2);
    if (data.password2 !== data.password3) {
      setError2('checkInputPasswords', { type: 'password', message: 'New passwords do not match' });

      const timeId = setTimeout(() => {
        reset();
      }, 3000);

      return () => {
        clearTimeout(timeId);
      };
    }

    if (typeof response === 'string') {
      setError2('password', { type: 'password', message: response });
      const timeId = setTimeout(() => {
        reset();
      }, 3000);

      return () => {
        clearTimeout(timeId);
      };
    }

    setPasswordmessage('Password updated');
    return null;
  };

  const changeLanguages: SubmitHandler<FieldValues> = async (data) => {
    if (data.currentKnownLanguageId === data.currentLearnLanguageId) {
      setError3('languages', { type: 'languages', message: ' Learning language cannot be the same as known language' });
      const timeId = setTimeout(() => {
        reset3();
      }, 5000);

      return () => {
        clearTimeout(timeId);
      };
    }
    const response = await userServices
      .setUserLanguages(data.currentKnownLanguageId, data.currentLearnLanguageId);
    setUser(response);
    setLanguagemessage('Language settings updated');
    return null;
  };

  useEffect(() => {
    getLanguageListFromServer();
  }, []);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowUserMessage(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
      setUsermessage('');
      setShowUserMessage(true);
    };
  }, [showUserMessage]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowPasswordmessage(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
      setPasswordmessage('');
      setShowPasswordmessage(true);
    };
  }, [showPasswordmessage]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowLanguageMessage(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
      setLanguagemessage('');
      setShowLanguageMessage(true);
    };
  }, [showLanguageMessage]);

  const confirmPassword = async function(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const match = await userServices.confirmPassword(password);
    setPasswordIsConfirmed(match);
  };

  const removeUser = async function() {
    const response = await userServices.removeUser();
    if (response.status === 204) {
      setUser(null);
      localStorage.clear();
    }
  };

  return (<div> {user && (
  <div className="max-w-7xl mx-auto py-8 px-4 sm:py-6 sm:px-6 lg:px-8">
    <div className='max-w-7xl mx-auto px-4 pt-6 sm:px-6 lg:px-8'>
      <div className='pb-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between'>
        <img
          className="mx-auto dark:hidden h-20 w-auto"
          src={logo}
          alt="logo"
        />
        <img
          className="mx-auto hidden dark:block h-20 w-auto"
          src={logoDark}
          alt="logo"
        />
      </div>
    </div>

    <div className="md:grid md:grid-cols-3  mx-auto md:gap-6 min-h-full max-w-7xl sm:grid-cols-1 lg:grid-cols-3 px-4 py-8 sm:px-8 lg:px-10">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h2 className="text-lg font-medium leading-6 text-tertiary">User account settings</h2>
          <p id="loggedin-status" className="loggedin-status mt-1 text-sm text-secondary">{user.username} at {user.email} is logged in</p>
        </div>
      </div>

      <div className="md:col-start-2 md:col-span-2 mt-8 md:mt-0">
        <div className='flex flex-col gap-6'>
          <form key={1} onSubmit={handleSubmit(changeUserInfo)}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-tertiary sm:p-6 flex flex-col gap-4">
                <div>
                  <h2 className="text-xl text-secondary tracking-normal">Update your display name and email</h2>
                  <p className="text-sm text-green-600 font-bold">{showUserMessage && usermessage}</p>
                </div>

                <div>
                  <label className="label text-sm mb-6" htmlFor="username">Name</label>
                  <input {...register('username', { required: true, minLength: 2, maxLength: 20 })} id="username" name="username" defaultValue={user.username} className="input appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-four dark:border-transparent placeholder-gray-500 text-tertiary focus:outline-none focus:ring-0 dark:focus:border-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" type="text" />
                  {errors.username?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Please enter a user name.</p>)}
                  {errors.username?.type === 'minLength' && (<p style={{ color: 'red', fontSize: '14px' }}> Name should have a mininum of 3 characters.</p>)}
                  {errors.username?.type === 'maxLength' && (<p style={{ color: 'red', fontSize: '14px' }}> Name should have a maxinum of 20 characters.</p>)}
                </div>

                <div>
                  <label htmlFor="email" className="label text-sm mb-6">Email</label>
                  <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} id="email" name="email" autoComplete='email' className="input bg-four dark:border-transparent appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  defaultValue={user.email} type="email" />
                  {errors.email?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Email address is required.</p>)}
                  {errors.email?.type === 'pattern' && (<p style={{ color: 'red', fontSize: '14px' }}> Please enter an email address.</p>)}
                  {errors.email && (<p style={{ color: 'red', fontSize: '14px' }}>{ errors.email.message}</p>)}
                </div>

                <div className='pt-2 text-right'>
                  <button
                    type="submit" name="button-name-email"
                    className="relative button-name-email inline-flex items-center px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>

          <form key={2} onSubmit={handleSubmit2(changePassword)}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-tertiary sm:p-6  flex flex-col gap-4">
                <div className=''>
                  <h2 className="text-xl text-secondary mb-3 tracking-normal">Update your password</h2>
                  <p className="password-message text-sm text-green-600 font-bold">{showPasswordmessage && passwordmessage}</p>
                  <p className="text-secondary text-sm">Update password by providing a new one with the current password:</p>
                </div>

                <div className='hidden'>
                  <label htmlFor="username-hidden" className="label text-sm">Username</label>
                  <input
                    id="username-hidden" autoComplete='username' className="input bg-four dark:border-transparent appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" type="text" />
                </div>

                <div>
                  <label htmlFor="password1" className="label text-sm">Current Password</label>
                  <input {...register2('password1', { required: true, pattern: /^.{6,}$/ })}
                    id="password" autoComplete='current-password' className="input bg-four dark:border-transparent appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" type="password" />
                  {errors2.password1?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Password is required </p>)}
                  {errors2.password1?.type === 'pattern' && (<p style={{ color: 'red', fontSize: '14px' }}> The password should have at least 6 characters</p>)}
                </div>

                <div>
                  <label htmlFor="password2" className="label text-sm">New Password</label>
                  <input {...register2('password2', { required: true, pattern: /^.{6,}$/ })}
                    id="password2" autoComplete='new-password' className="input bg-four dark:border-transparent appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" type="password" />
                  {errors2.password2?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Password is required </p>)}
                  {errors2.password2?.type === 'pattern' && (<p style={{ color: 'red', fontSize: '14px' }}> The password should have at least 6 characters</p>)}
                </div>
                <div>
                  <label htmlFor="password3" className="label text-sm">New Password Again</label>
                  <input {...register2('password3', { required: true, pattern: /^.{6,}$/ })}
                    id="password3" autoComplete='new-password' className="input bg-four dark:border-transparent appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" type="password" />
                  {errors2.password3?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Password is required </p>)}
                  {errors2.password3?.type === 'pattern' && (<p style={{ color: 'red', fontSize: '14px' }}> The password should have at least 6 characters</p>)}
                  {errors2.password && (<p style={{ color: 'red', fontSize: '14px' }}>{ errors2.password.message}</p>)}
                  {errors2.checkInputPasswords && (<p style={{ color: 'red', fontSize: '14px' }}>{ errors2.checkInputPasswords.message}</p>)}
                </div>


                <div className='pt-2 text-right'>
                  <button
                    type="submit"
                    className="button-password relative inline-flex items-center px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>

          <form key={3} onSubmit={handleSubmit3(changeLanguages)}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-tertiary sm:p-6 flex flex-col gap-4">
                <div>
                  <h2 className="text-xl text-secondary mb-3 tracking-normal">Update your learning preferences</h2>
                  <p className="text-secondary text-sm">Update languages:</p>
                  <p className="text-sm text-green-600 font-bold">{showLanguageMessage && languagemessage}</p>
                </div>

                <div>
                  <label htmlFor="currentKnownLanguageId" className='label text-sm'>I know</label>
                    {<select {...register3('currentKnownLanguageId')} defaultValue={user?.knownLanguageId} className="input bg-four dark:border-transparent appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-600 focus:border-sky-600 focus:z-10 sm:text-sm">
                    {languages.map((lang) => <option key={lang.id}
                      value={lang.id}>{flags[lang.id]} {names[lang.id]}</option>)}
                    </select>}
                </div>

                <div>
                  <label htmlFor="currentLearnLanguageId" className='label text-sm'>I want to learn</label>
                  {<select {...register3('currentLearnLanguageId')} defaultValue={user?.learnLanguageId} className="input bg-four dark:border-transparent appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-600 focus:border-sky-600 focus:z-10 sm:text-sm">
                  {languages.map((lang) => <option key={lang.id}
                    value={lang.id}>{flags[lang.id]} {names[lang.id]}</option>)}
                  </select>}
                  {errors3.languages && (<p style={{ color: 'red', fontSize: '14px' }}>{ errors3.languages.message}</p>)}
                </div>

                <div className='pt-2 text-right'>
                  <button
                    type="submit"
                    className="button-lang-preferences relative inline-flex items-center px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600"
                  >
                    Save
                  </button>
                </div>
                </div>
                </div>
              </form>
              <div className="shadow sm:rounded-md  border dark:border-red-800 border-red-600 sm:overflow-hidden">
                <div className="px-4 py-5 bg-tertiary  sm:p-6 flex flex-col gap-4">
                  <div className='flex justify-between gap-6'>
                    <div>
                      <p className='text-xl text-secondary mb-3 tracking-normal'>Delete my account permanently</p>
                      <p className='text-secondary text-sm'>Once you delete your account, it cannot be recovered. Please be careful with this option.</p>
                    </div>
                    <button
                        type="submit"
                        onClick={() => setOpenModal(true)}
                        className="relative inline-flex items-center px-8 py-2 border dark:border-gray-600 border-gray-400 rounded-md shadow-sm text-sm font-medium text-red-600 dark:bg-gray-700 bg-gray-200 dark:hover:bg-red-700 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-1 hover:text-white focus:ring-red-700"
                    >
                      Delete my account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>)}
    <Transition.Root show={openModal} as={Fragment}>
    <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => console.log('closed')}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="inline-block align-bottom bg-secondary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-secondary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-tertiary">
                    Delete text
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col gap-4">
                    <p className="text-sm text-gray-500">
                      Are you sure you wish to delete your account? Once deleted,
                      it cannot be recovered. If so, please confirm your password here:
                    </p>
                    <form className='flex flex-row' onSubmit={(event) => confirmPassword(event)} action="">
                      <input value={password} onChange={(event) => setPassword(event?.target.value)} type="password" autoComplete='new-password' className="input bg-four dark:border-transparent appearance-none rounded-l-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" />
                      <div className='hidden'>
                        <label htmlFor="username" className="label hidden text-sm">Username</label>
                        <input
                          autoComplete='username' name='username' className="input hidden w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" type="text" />
                      </div>
                      <button type='submit' className="relative button-name-email inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >Confirm</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className={`${passwordIsConfirmed ? ' hover:bg-red-700 bg-red-600 focus:ring-red-500' : 'bg-gray-300 dark:bg-gray-600 text-gray-400 pointer-events-none'} w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
                onClick={async () => {
                  if (passwordIsConfirmed) {
                    await removeUser();
                    window.scrollTo(0, 0);
                    navigate('/');
                  }
                }}
              >
                Delete
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-secondary text-base font-medium text-six hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {
                  setOpenModal(false);
                  setPassword('');
                  setPasswordIsConfirmed(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition.Root>
  </div>);
}

