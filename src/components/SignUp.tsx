/* eslint-disable max-len */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { languagesState, userState, languageFlagsState } from '../states/recoil-states';

import userServices from '../services/users';
import languageServices from '../services/languages';
import loginService from '../services/login';

import capitalize from '../utils/capitalize';

import { User, LoggedInUser } from '../types';

const logo = require('../assets/logo/logo-light.png');

export default function SignUp() {
  const navigate = useNavigate();

  const [languages, setLanguages] = useRecoilState(languagesState);
  const flags = useRecoilValue(languageFlagsState);
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
    <main className='container mx-auto mb-auto'>
     <div className="min-h-full flex items-center justify-center py-12 px-6 sm:px-8 lg:px-10">
        <div className="max-w-sm w-fit space-y-8">
          <div>
            <img
              className="mx-auto h-24 w-auto"
              src={logo}
              alt="logo"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for a new account</h2>
            <p className="text-center">All fields are required.</p>
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

          <label className="label text-sm mb-6" htmlFor="username">Name</label>
          <input {...register('username', { required: true, minLength: 2, maxLength: 20 })} id="username" className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-fuchsia-700 focus:border-fuchsia-700 focus:z-10 sm:text-sm" type="text" />
          {errors.username?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Please enter a user name.</p>)}
          {errors.username?.type === 'minLength' && (<p style={{ color: 'red', fontSize: '14px' }}> Name should have a minimum of 2 characters.</p>)}
          <label htmlFor="email" className="label text-sm mb-6">Email</label>
          <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-fuchsia-700 focus:border-fuchsia-700 focus:z-10 sm:text-sm"
           type="email" />
          {errors.email?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Email address is required.</p>)}
          {errors.email?.type === 'pattern' && (<p style={{ color: 'red', fontSize: '14px' }}> Please enter an email address.</p>)}
          {errors.email && (<p style={{ color: 'red', fontSize: '14px' }}> {errors.email.message}</p>)}
          <label htmlFor="password" className="label text-sm mb-6">Password</label>
          <input {...register('password', { required: true, pattern: /^.{6,}$/ })}
            className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-fuchsia-700 focus:border-fuchsia-700 focus:z-10 sm:text-sm"
            type="password" />
          {errors.password?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Password is required.</p>)}
          {errors.password?.type === 'pattern' && (<p style={{ color: 'red', fontSize: '14px' }}> The password should have at least 6 characters.</p>)}
          <br></br>
          <div>
            <label htmlFor="knownLanguageId" className='label text-sm mb-6'>I know</label>
              {<select title="language to translate into" {...register('knownLanguageId')} className="knownLanguageId input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-fuchsia-700 focus:border-fuchsia-700 focus:z-10 sm:text-sm">
              {languages.map((lang) => <option key={lang.id} value={lang.id}>{flags[lang.id]} {capitalize(lang.name)}</option>)}
              </select>}
          </div>
          <div>
            <label htmlFor="learnLanguageId" className='label text-sm mb-6'>I want to learn</label>
            {<select title="language to learn" {...register('learnLanguageId')} className="learnLanguageId input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-fuchsia-700 focus:border-fuchsia-700 focus:z-10 sm:text-sm">
            {languages.map((lang) => <option key={lang.id} value={lang.id}>{flags[lang.id]} {capitalize(lang.name)}</option>)}
            </select>}
            {errors.learnLanguageId && (<p style={{ color: 'red', fontSize: '14px' }}>{errors.learnLanguageId.message}</p>)}
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
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-fuchsia-900 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-700">
            Sign up
          </button>
          </div>
         </form>
       </div>
      </div>
     </main>
  );
}
