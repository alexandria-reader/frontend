/* eslint-disable max-len */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import {
  languagesState, userState, languageFlagsState, languageNamesState,
} from '../states/recoil-states';

import userServices from '../services/users';
import languageServices from '../services/languages';
import loginService from '../services/login';

import { User, LoggedInUser } from '../types';

const logo = require('../assets/logo/logo-light.png');
const logoDark = require('../assets/logo/logo-dark.png');

export default function SignUp() {
  const navigate = useNavigate();

  const [languages, setLanguages] = useRecoilState(languagesState);
  const flags = useRecoilValue(languageFlagsState);
  const names = useRecoilValue(languageNamesState);
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
        <div className="max-w-md dark:shadow dark:bg-tertiary py-8 px-4 sm:py-6 sm:px-6 w-fit flex flex-col gap-6">
          <div className=''>
            <img
              className="mx-auto dark:hidden h-24 w-auto"
              src={logo}
              alt="logo"
            />
            <img
              className="mx-auto hidden dark:block h-24 w-auto"
              src={logoDark}
              alt="logo"
            />
          </div>

          <div>
            <h2 className="text-center text-3xl font-extrabold text-tertiary">Sign up for a new account</h2>
            <p className="text-center">All fields are required.</p>
          </div>

          <form className='form-div flex flex-col gap-4' onSubmit={
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

          <div>
            <label className="label text-sm" htmlFor="username">Name</label>
            <input {...register('username', { required: true, minLength: 2, maxLength: 20 })} id="username" placeholder='' className="input bg-four dark:border-transparent rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary rounded-t-md focus:outline-none focus:ring-fuchsia-700 focus:border-fuchsia-700 focus:z-10 sm:text-sm" type="text" />
            {errors.username?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Please enter a user name.</p>)}
            {errors.username?.type === 'minLength' && (<p style={{ color: 'red', fontSize: '14px' }}> Name should have a minimum of 2 characters.</p>)}
          </div>

          <div>
            <label htmlFor="email" className="label text-sm">Email</label>
            <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className="input bg-four dark:border-transparent rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-fuchsia-700 focus:border-fuchsia-700 focus:z-10 sm:text-sm"
             type="email" />
            {errors.email?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Email address is required.</p>)}
            {errors.email?.type === 'pattern' && (<p style={{ color: 'red', fontSize: '14px' }}> Please enter an email address.</p>)}
            {errors.email && (<p style={{ color: 'red', fontSize: '14px' }}> {errors.email.message}</p>)}
          </div>

          <div>
            <label htmlFor="password" className="label text-sm">Password</label>
            <input {...register('password', { required: true, pattern: /^.{6,}$/ })}
              className="input appearance-none relative block w-full px-3 py-2 border bg-four dark:border-transparent rounded-md border-gray-300 placeholder-gray-500 text-tertiary rounded-b-md focus:outline-none focus:ring-fuchsia-700 focus:border-fuchsia-700 focus:z-10 sm:text-sm"
              type="password" />
            {errors.password?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Password is required.</p>)}
            {errors.password?.type === 'pattern' && (<p style={{ color: 'red', fontSize: '14px' }}> The password should have at least 6 characters.</p>)}
          </div>

          <div>
            <label htmlFor="knownLanguageId" className='label text-sm'>I know</label>
              {<select title="language to translate into" {...register('knownLanguageId')} className="knownLanguageId input bg-four dark:border-transparent rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-fuchsia-700 focus:border-fuchsia-700 focus:z-10 sm:text-sm">
              {languages.map((lang) => <option key={lang.id} value={lang.id}>{flags[lang.id]} {names[lang.id]}</option>)}
              </select>}
          </div>

          <div>
            <label htmlFor="learnLanguageId" className='label text-sm'>I want to learn</label>
            {<select title="language to learn" {...register('learnLanguageId')} className="learnLanguageId input appearance-none bg-four dark:border-transparent rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-fuchsia-700 focus:border-fuchsia-700 focus:z-10 sm:text-sm">
            {languages.map((lang) => <option key={lang.id} value={lang.id}>{flags[lang.id]} {names[lang.id]}</option>)}
            </select>}
            {errors.learnLanguageId && (<p style={{ color: 'red', fontSize: '14px' }}>{errors.learnLanguageId.message}</p>)}
          </div>

          <div>
            <div className="userFields hidden" aria-hidden="true">
              <label className="label phone">Phone number</label>
              <input {...register('phone')} className="input phone" type="text" tabIndex={-1}/>
              <label className="label website">Website</label>
              <input {...register('website')} className="input website hidden" type="text" tabIndex={-1}/>
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 my-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-fuchsia-900 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-700">
              Sign up
            </button>
          </div>
         </form>
       </div>
      </div>
     </main>
  );
}
