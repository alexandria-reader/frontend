/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { LockClosedIcon } from '@heroicons/react/solid';
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
    register, formState: { errors }, handleSubmit,
  } = useForm({
    mode: 'onSubmit',
  });

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    // setError: setError2,
  } = useForm({
    mode: 'onSubmit',
  });

  const {
    register: register3,
    formState: { errors: errors3 },
    handleSubmit: handleSubmit3,
    // setError: setError3,
  } = useForm({
    mode: 'onSubmit',
  });

  const getLanguageListFromServer = async function() {
    const dbLanguages = await languageServices.getAllLanguages();
    setLanguages(dbLanguages);
  };

  const changeUserInfo = async(data: { username: string; email: string; }) => {
    const response = await userServices.updateInfo(data.username, data.email);
    setUser(response);
    setUsermessage('User information updated');
  };

  const changePassword = async (data: { newPassword1: string; newPassword2: string; currentPassword: string; }) => {
    // if (data.newPassword1 !== data.newPassword2) {
    //   setError2('password', { type: 'password', message: 'New passwords must match' });
    //   return;
    // }
    // if (data.newPassword1.length < 6) {
    //   setError2('password', { type: 'passwordLength', message: 'Password must be longer than 6 characters.' });
    //   return;
    // }
    const response = await userServices.updatePassword(data.currentPassword, data.newPassword1);
    setUser(response);
    setPasswordmessage('Password updated');
  };

  const changeLanguages = async (data: { currentKnownLanguageId: string; currentLearnLanguageId: string; }) => {
    // if (data.currentKnownLanguageId === data.currentLearnLanguageId) {
    //   setError3('learnLanguageId', { type: 'languages', message: ' Learning language cannot be the same as known language' });
    //   return;
    // }
    const response = await userServices.setUserLanguages(data.currentKnownLanguageId, data.currentLearnLanguageId);
    setUser(response);
    setLanguagemessage('Language settings updated');
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
    }, 5000);

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
      <label className="label sr-only" htmlFor="username">Name</label>
        <input {...register('username', { required: true, minLength: 3, maxLength: 20 })} id="username" name="username" defaultValue={user.username} className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" type="text" />
        {errors.username?.type === 'required' && ' Please enter a user name.'}
        {errors.username?.type === 'minLength' && ' Name should have a mininum of 3 characters.'}
        <label htmlFor="email" className="label sr-only">Email</label>
        <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} id="email" name="email" className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-b-md"
        defaultValue={user.email} type="email" />
        {errors.email?.type === 'required' && ' Email address is required.'}
        {errors.email?.type === 'pattern' && ' Please enter an email address.'}
        {errors.email && errors.email.message}
        <div className='py-6 sm:pt-6 text-right'>
          <button
            type="submit" name="button-name-email"
            className="relative inline-flex items-center px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
          <span className="absolute left-0 inset-y-0 flex items-center pl-2 ">
            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
          </span>
          Save
        </button>
    </div>
    </form>
    <form key={2} onSubmit={handleSubmit2(changePassword)}>
    <h2 className="text-xl text-gray-600 mb-3 tracking-normal">Update your password</h2>
    <p className="text-sm mb-6 text-green-600 font-bold">{showPasswordmessage && passwordmessage}</p>
    <p className="text-gray-600 text-sm mb-6">Update password by providing a new one with the current password.</p>
     <label htmlFor="current-password" className="label sr-only">Password</label>
     {/* <input {...register('currentPassword', { required: true, pattern: /^.{6,}$/ })} */}
     <input {...register2('currentPassword')}
      className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder='Old Password' type="password" />
    {errors2.password?.type === 'required' && ' Password is required.'}
    {errors2.password?.type === 'pattern' && ' The password should have at least 6 characters.'}
    <label htmlFor="new-password" className="label sr-only">Password</label>
     {/* <input {...register('newPassword1', { required: true, pattern: /^.{6,}$/ })} */}
     <input {...register2('newPassword1')}
      className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder='Password' type="password" />
    {errors2.password?.type === 'required' && ' Password is required.'}
    {errors2.password?.type === 'pattern' && ' The password should have at least 6 characters.'}
     <label htmlFor="new-password-2" className="label sr-only">New Password</label>
     {/* <input {...register('newPassword2', { required: true, pattern: /^.{6,}$/ })} */}
     <input {...register2('newPassword2')}
      className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder='Confirm New Password' type="password" />
    {/* {errors2.password?.type === 'required' && ' Password is required.'}
    {errors2.password?.type === 'pattern' && ' The password should have at least 6 characters.'} */}
    <p className="text-sm mt-6 text-red-600 font-bold">{errors2.password && errors2.password.message}</p>
    <p className="text-sm mt-6 text-red-600 font-bold">{errors2.passwordLength && errors2.passwordLength.message}</p>
    <div className='py-6 sm:pt-6 text-right'>
        <button
          type="submit"
          className="relative inline-flex items-center px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
        <span className="absolute left-0 inset-y-0 flex items-center pl-2 ">
          <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
        </span>
        Save
      </button>
    </div>
    </form>
    <form key={3} onSubmit={handleSubmit3(changeLanguages)}>
    <h2 className="text-xl text-gray-600 mb-3 tracking-normal">Update your learning preferences</h2>
    <p className="text-gray-600 text-sm mb-6">Update languages</p>
    <p className="text-sm mb-6 text-green-600 font-bold">{showLanguageMessage && languagemessage}</p>
    <div className="flex flex-wrap w-full custom-select">
      <label htmlFor="currentKnownLanguageId" className='text-ml font-normal text-gray-700 w-1/3 py-2'>I know</label>
        {<select {...register3('currentKnownLanguageId')} defaultValue={user?.knownLanguageId} className="appearance-none rounded-none relative w-2/3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
        {languages.map((lang) => <option key={lang.id} value={lang.id}>{lang.name}</option>)}
        </select>}
    </div>
    <div className="flex flex-wrap w-full custom-select">
      <label htmlFor="currentLearnLanguageId" className='text-ml font-normal text-gray-700 w-1/3 py-2'>I want to learn</label>
      {<select {...register3('currentLearnLanguageId')} defaultValue={user?.learnLanguageId} className="input appearance-none rounded-none w-2/3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
      {languages.map((lang) => <option key={lang.id} value={lang.id}>{lang.name} </option>)}
      </select>}
      <p className="text-sm mt-6 text-red-600 font-bold">{errors3.learnLanguageId && errors3.learnLanguageId.message}</p>
    </div>
    <div className='py-6 sm:pt-6 text-right'>
          <button
            type="submit"
            className="relative inline-flex items-center px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
          <span className="absolute left-0 inset-y-0 flex items-center pl-2 ">
            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
          </span>
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

