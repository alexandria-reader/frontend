/* eslint-disable max-len */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { LockClosedIcon } from '@heroicons/react/solid';
import userServices from '../services/users';
import languageServices from '../services/languages';
import { languagesState } from '../states/recoil-states';
import getToken from '../utils/getToken';

const logo = require('../assets/logo2.png');

export default function Settings() {
  const tokenObj = getToken();
  console.log(tokenObj);
  const navigate = useNavigate();
  const [languages, setLanguages] = useRecoilState(languagesState);
  const {
    register, formState: { errors }, handleSubmit, setError,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: tokenObj.username, email: tokenObj.email, password: '', currentKnownLanguageId: 'en', currentLearnLanguageId: 'en',
    },
  });

  const getLanguageListFromServer = async function() {
    const dbLanguages = await languageServices.getAllLanguages();
    setLanguages(dbLanguages);
  };

  useEffect(() => {
    getLanguageListFromServer();
  }, []);

  return (
    <div> {tokenObj && (<div className="min-h-full flex items-center justify-center py-12 px-6 sm:px-8 lg:px-10">
    <div className="max-w-sm w-fit space-y-8">
      <div>
        <img
          className="mx-auto h-20 w-auto"
          src={logo}
          alt="logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">User account settings</h2>
      </div>
      <form className='form-div' onSubmit={handleSubmit(async (data) => {
        if (data.currentKnownLanguageId === data.currentLearnLanguageId) {
          setError('currentLearnLanguageId', { type: 'languages', message: ' Learning language cannot be the same as known language' });
          return;
        }
        const user = {
          username: data.username,
          email: data.email,
          password: data.password,
          currentKnownLanguageId: data.currentKnownLanguageId,
          currentLearnLanguageId: data.currentLearnLanguageId,
        };
        const response = await userServices.addUser(user);
        if (typeof response === 'string') {
          setError('email', { type: 'email', message: response });
        }
        if (user.currentKnownLanguageId !== tokenObj.currentKnownLanguageId || user.currentLearnLanguageId !== tokenObj.currentLearnLanguageId) {
          userServices.setUserLanguages({ currentKnownLanguageId: user.currentKnownLanguageId, currentLearnLanguageId: user.currentLearnLanguageId });
        }
        if (user.email !== tokenObj.email || user.username !== tokenObj.username) {
          // userServices.setUserInfo({ username: user.username, email: user.email });
        }
        navigate('/texts');
        // else if (response.status === 201) {
        //   const loggedInUser: User = await loginService.loginUser({
        //     email: user.email,
        //     password: user.password,
        //   });
        //   localStorage.setItem('user', JSON.stringify(loggedInUser));
        //   navigate('/texts');
        // }
      })}>
       <h2 className="text-xl text-gray-600 mb-6 tracking-normal">Update your display name and email</h2>
        <label className="label sr-only" htmlFor="username">Name</label>
          <input {...register('username', { required: true, minLength: 3, maxLength: 20 })} id="username" className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" type="text" />
          {errors.username?.type === 'required' && ' Please enter a user name.'}
          {errors.username?.type === 'minLength' && ' Name should have a mininum of 3 characters.'}
          <label htmlFor="email" className="label sr-only">Email</label>
          <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            type="email" />
          {errors.email?.type === 'required' && ' Email address is required.'}
          {errors.email?.type === 'pattern' && ' Please enter an email address.'}
          {errors.email && errors.email.message}
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

      <h2 className="text-xl text-gray-600 mb-3 tracking-normal">Update your password</h2>
      <p className="text-gray-600 text-sm mb-6">Update password by providing a new one with the current password.</p>
       <label htmlFor="old-password" className="label sr-only">Password</label>
       <input {...register('password', { required: true, pattern: /^.{6,}$/ })}
        className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder='Old Password' type="password" />
      {errors.password?.type === 'required' && ' Password is required.'}
      {errors.password?.type === 'pattern' && ' The password should have at least 6 characters.'}
      <label htmlFor="new-password" className="label sr-only">Password</label>
       <input {...register('password', { required: true, pattern: /^.{6,}$/ })}
        className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder='Password' type="password" />
      {errors.password?.type === 'required' && ' Password is required.'}
      {errors.password?.type === 'pattern' && ' The password should have at least 6 characters.'}
      <label htmlFor="new-password-2" className="label sr-only">New Password</label>
       <input {...register('password', { required: true, pattern: /^.{6,}$/ })}
        className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder='Confirm New Password' type="password" />
      {errors.password?.type === 'required' && ' Password is required.'}
      {errors.password?.type === 'pattern' && ' The password should have at least 6 characters.'}
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
      <br></br>

      <h2 className="text-xl text-gray-600 mb-3 tracking-normal">Update your learning preferences</h2>
      <p className="text-gray-600 text-sm mb-6">Update languages</p>
      <div className="flex flex-wrap w-full custom-select">
        <label htmlFor="currentKnownLanguageId" className='text-ml font-normal text-gray-700 w-1/3 py-2'>I know</label>
          {<select {...register('currentKnownLanguageId')} className="appearance-none rounded-none relative w-2/3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
          {languages.map((lang) => <option key={lang.id} value={lang.id}>{lang.name}</option>)}
          </select>}
      </div>
      <div className="flex flex-wrap w-full custom-select">
        <label htmlFor="currentLearnLanguageId" className='text-ml font-normal text-gray-700 w-1/3 py-2'>I want to learn</label>
        {<select {...register('currentLearnLanguageId')} className="input appearance-none rounded-none w-2/3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
        {languages.map((lang) => <option key={lang.id} value={lang.id}>{lang.name} </option>)}
        </select>}
        {errors.currentLearnLanguageId && errors.currentLearnLanguageId.message}
      </div>
      <br></br>
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
  </div>)};
    </div>);
}
