/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
// import { LockClosedIcon } from '@heroicons/react/solid';
import userServices from '../services/users';
import languageServices from '../services/languages';
import {
  languagesState, userState,
} from '../states/recoil-states';

const logo = require('../assets/logo2.png');

export default function Settings() {
  const [user, setUser] = useRecoilState(userState);
  const [languages, setLanguages] = useRecoilState(languagesState);
  const [usermessage, setUsermessage] = useState('');
  const [showUserMessage, setShowUserMessage] = useState(true);
  const [passwordmessage, setPasswordmessage] = useState('');
  const [showPasswordmessage, setShowPasswordmessage] = useState(true);
  const [languagemessage, setLanguagemessage] = useState('');
  const [showLanguageMessage, setShowLanguageMessage] = useState(true);

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

  const changeUserInfo = async(data: { username: string; email: string; }) => {
    const response = await userServices.updateInfo(data.username, data.email);
    if (typeof response === 'object') {
      setUser(response);
      setUsermessage('User information updated');
    } else {
      setError('email', { type: 'email', message: 'Email already exists.' });
    }
  };

  const changePassword = async (data: { password1: string; password2: string; password3: string; }) => {
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

  const changeLanguages = async (data: { currentKnownLanguageId: string; currentLearnLanguageId: string; }) => {
    if (data.currentKnownLanguageId === data.currentLearnLanguageId) {
      setError3('languages', { type: 'languages', message: ' Learning language cannot be the same as known language' });
      const timeId = setTimeout(() => {
        reset3();
      }, 5000);

      return () => {
        clearTimeout(timeId);
      };
    }
    const response = await userServices.setUserLanguages(data.currentKnownLanguageId, data.currentLearnLanguageId);
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

  return (<div> {user && (
  <div className="max-w-7xl mx-auto py-8 px-4 sm:py-6 sm:px-6 lg:px-8">
     <img
        className="mx-auto h-20 w-auto"
        src={logo}
        alt="logo"
    />
  <div className="max-w-7xl mx-auto py-8 px-4 sm:py-6 sm:px-6 lg:px-8 md:flex flex-row">
    <div className="max-w-sm w-fit space-y-8 basis-1/2">
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">User account settings</h2>
    <p className="text-gray-600 text-sm mb-6 px-10">{user.username} at {user.email} is logged in</p>
  </div>
  <div>
    <div className="min-h-full items-center py-12 px-6 sm:px-8 lg:px-10 basis-1/2">
    <form key={1} onSubmit={handleSubmit(changeUserInfo)}>
     <h2 className="text-xl text-gray-600 mb-6 tracking-normal">Update your display name and email</h2>
     <p className="text-sm mb-6 text-green-600 font-bold">{showUserMessage && usermessage}</p>
      <label className="label text-sm mb-6" htmlFor="username">Name</label>
        <input {...register('username', { required: true, minLength: 2, maxLength: 20 })} id="username" name="username" defaultValue={user.username} className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" type="text" />
        {errors.username?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Please enter a user name.</p>)}
        {errors.username?.type === 'minLength' && (<p style={{ color: 'red', fontSize: '14px' }}> Name should have a mininum of 3 characters.</p>)}
        {errors.username?.type === 'maxLength' && (<p style={{ color: 'red', fontSize: '14px' }}> Name should have a maxinum of 20 characters.</p>)}
        <label htmlFor="email" className="label text-sm mb-6">Email</label>
        <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} id="email" name="email" className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        defaultValue={user.email} type="email" />
        {errors.email?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Email address is required.</p>)}
        {errors.email?.type === 'pattern' && (<p style={{ color: 'red', fontSize: '14px' }}> Please enter an email address.</p>)}
        {errors.email && (<p style={{ color: 'red', fontSize: '14px' }}>{ errors.email.message}</p>)}
        <div className='py-6 sm:pt-6 text-right'>
          <button
            type="submit" name="button-name-email"
            className="relative inline-flex items-center px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
          Save
        </button>
    </div>
    </form>
    <form key={2} onSubmit={handleSubmit2(changePassword)}>
    <h2 className="text-xl text-gray-600 mb-3 tracking-normal">Update your password</h2>
    <p className="text-sm mb-6 text-green-600 font-bold">{showPasswordmessage && passwordmessage}</p>
    <p className="text-gray-600 text-sm mb-6">Update password by providing a new one with the current password.</p>
     <label htmlFor="password1" className="label text-sm mb-6">Current Password</label>
     <input {...register2('password1', { required: true, pattern: /^.{6,}$/ })}
      className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" type="password" />
    {errors2.password1?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Password is required </p>)}
    {errors2.password1?.type === 'pattern' && (<p style={{ color: 'red', fontSize: '14px' }}> The password should have at least 6 characters</p>)}
    <label htmlFor="password2" className="label text-sm mb-6">New Password</label>
     <input {...register2('password2', { required: true, pattern: /^.{6,}$/ })}
      className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" type="password" />
    {errors2.password2?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Password is required </p>)}
    {errors2.password2?.type === 'pattern' && (<p style={{ color: 'red', fontSize: '14px' }}> The password should have at least 6 characters</p>)}
     <label htmlFor="password3" className="label text-sm mb-6">New Password Again</label>
     <input {...register2('password3', { required: true, pattern: /^.{6,}$/ })}
      className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" type="password" />
    {errors2.password3?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Password is required </p>)}
    {errors2.password3?.type === 'pattern' && (<p style={{ color: 'red', fontSize: '14px' }}> The password should have at least 6 characters</p>)}
    {errors2.password && (<p style={{ color: 'red', fontSize: '14px' }}>{ errors2.password.message}</p>)}
    {errors2.checkInputPasswords && (<p style={{ color: 'red', fontSize: '14px' }}>{ errors2.checkInputPasswords.message}</p>)}
    <div className='py-6 sm:pt-6 text-right'>
        <button
          type="submit"
          className="relative inline-flex items-center px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
        Save
      </button>
    </div>
    </form>
    <form key={3} onSubmit={handleSubmit3(changeLanguages)}>
    <h2 className="text-xl text-gray-600 mb-3 tracking-normal">Update your learning preferences</h2>
    <p className="text-gray-600 text-sm mb-6">Update languages</p>
    <p className="text-sm mb-6 text-green-600 font-bold">{showLanguageMessage && languagemessage}</p>
    <div>
      <label htmlFor="currentKnownLanguageId" className='label text-sm mb-6'>I know</label>
        {<select {...register3('currentKnownLanguageId')} defaultValue={user?.knownLanguageId} className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
        {languages.map((lang) => <option key={lang.id} value={lang.id}>{lang.flag} {lang.name.charAt(0).toUpperCase() + lang.name.slice(1)}</option>)}
        </select>}
    </div>
    <div>
      <label htmlFor="currentLearnLanguageId" className='label text-sm mb-6'>I want to learn</label>
      {<select {...register3('currentLearnLanguageId')} defaultValue={user?.learnLanguageId} className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
      {languages.map((lang) => <option key={lang.id} value={lang.id}>{lang.flag} {lang.name.charAt(0).toUpperCase() + lang.name.slice(1)} </option>)}
      </select>}
      {errors3.languages && (<p style={{ color: 'red', fontSize: '14px' }}>{ errors3.languages.message}</p>)}
    </div>
    <div className='py-6 sm:pt-6 text-right'>
          <button
            type="submit"
            className="relative inline-flex items-center px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
          {/* <span className="absolute left-0 inset-y-0 flex items-center pl-2 ">
            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
          </span> */}
          Save
        </button>
    </div>
   </form>
    </div>
    </div>
    </div>
  </div>)};
  </div>);
}

