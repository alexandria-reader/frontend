/* eslint-disable max-len */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { LockClosedIcon } from '@heroicons/react/solid';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { languagesState, userState } from '../states/recoil-states';

import userServices from '../services/users';
import languageServices from '../services/languages';
import loginService from '../services/login';

import { User, LoggedInUser } from '../types';

const logo = require('../assets/logo2.png');

export default function SignUp() {
  const navigate = useNavigate();
  const [languages, setLanguages] = useRecoilState(languagesState);
  const setUser = useSetRecoilState(userState);

  const {
    register, formState: { errors }, handleSubmit, setError,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '', email: '', password: '', knownLanguageId: 'en', learnLanguageId: 'fr', phone: '', website: '',
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
    <div>
     <div className="min-h-full flex items-center justify-center py-12 px-6 sm:px-8 lg:px-10">
        <div className="max-w-sm w-fit space-y-8">
          <div>
            <img
              className="mx-auto h-20 w-auto"
              src={logo}
              alt="logo"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for new account</h2>
          </div>
          <form className='form-div' onSubmit={
            handleSubmit(async (data) => {
              if (data.knownLanguageId === data.learnLanguageId) {
                setError('learnLanguageId', { type: 'languages', message: ' Learning language cannot be the same as known language' });
                return;
              }
              if (data.phone || data.website) {
                return;
              }

              const newUserData: User = {
                username: data.username,
                email: data.email,
                password: data.password,
                knownLanguageId: data.knownLanguageId,
                learnLanguageId: data.learnLanguageId,
              };

              const response = await userServices.addUser(newUserData);

              if (typeof response === 'string') {
                setError('email', { type: 'email', message: response });
              } else if (response.status === 201) {
                const loggedInUser: LoggedInUser = await loginService.loginUser({
                  email: newUserData.email,
                  password: newUserData.password,
                });

                setUser({
                  username: loggedInUser.username,
                  email: loggedInUser.email,
                  knownLanguageId: loggedInUser.knownLanguageId,
                  learnLanguageId: loggedInUser.learnLanguageId,
                });

                localStorage.setItem('alexandria-user-token', loggedInUser.token);

                navigate('/texts');
              }
            })
          }>

          <label className="label sr-only" htmlFor="username">Name</label>
          <input {...register('username', { required: true, minLength: 3, maxLength: 20 })} id="username" className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name"type="text" />
          {errors.username?.type === 'required' && ' Please enter a user name.'}
          {errors.username?.type === 'minLength' && ' Name should have a mininum of 3 characters.'}
          <label htmlFor="email" className="label sr-only">Email</label>
          <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email"
           type="email" />
          {errors.email?.type === 'required' && ' Email address is required.'}
          {errors.email?.type === 'pattern' && ' Please enter an email address.'}
          {errors.email && errors.email.message}
          <label htmlFor="password" className="label sr-only">Password</label>
          <input {...register('password', { required: true, pattern: /^.{6,}$/ })}
            className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password" type="password" />
          {errors.password?.type === 'required' && ' Password is required.'}
          {errors.password?.type === 'pattern' && ' The password should have at least 6 characters.'}
          <br></br>
          <div className="flex flex-wrap w-full custom-select">
            <label htmlFor="knownLanguageId" className='text-ml font-normal text-gray-700 w-1/3 py-2'>I know</label>
              {<select title="language to translate into" {...register('knownLanguageId')} className="appearance-none rounded-none relative w-2/3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
              {languages.map((language) => <option key={language.id} value={language.id}>{language.flag} {language.name}</option>)}
              </select>}
          </div>
          <div className="flex flex-wrap w-full custom-select">
            <label htmlFor="learnLanguageId" className='text-ml font-normal text-gray-700 w-1/3 py-2'>I want to learn</label>
            {<select title="language to learn" {...register('learnLanguageId')} className="input appearance-none rounded-none w-2/3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
            {languages.map((language) => <option key={language.id} value={language.id}>{language.flag} {language.name} </option>)}
            </select>}
            {errors.learnLanguageId && errors.learnLanguageId.message}
          </div>
          <br></br>
          <div>
          <div className="userFields" aria-hidden="true">
            <label className="label phone">Phone number</label>
            <input {...register('phone')} className="input phone" type="text" tabIndex={-1}/>
            <label className="label website">Website</label>
            <input {...register('website')} className="input website" type="text" tabIndex={-1}/>
          <br></br>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {/* <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span> */}
            Sign in
          </button>
          </div>
         </form>
       </div>
      </div>
     </div>
  );
}
