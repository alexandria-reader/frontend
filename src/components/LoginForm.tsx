/* eslint-disable max-len */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { userState } from '../states/recoil-states';

import loginService from '../services/login';
import { LoggedInUser } from '../types';

const logo = require('../assets/logo/logo-text-light.png');

export default function LoginForm({ from }: { from: string }) {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const setUser = useSetRecoilState(userState);

  const navigate = useNavigate();

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   try {
  //     const loggedInUser: LoggedInUser = await loginService.loginUser({
  //       email,
  //       password,
  //     });

  //     setUser({
  //       username: loggedInUser.username,
  //       email: loggedInUser.email,
  //       knownLanguageId: loggedInUser.knownLanguageId,
  //       learnLanguageId: loggedInUser.learnLanguageId,
  //     });

  //     localStorage.setItem('alexandria-user-token', loggedInUser.token);

  //     navigate(from, { replace: true });
  //   } catch (error) {
  //     // eslint-disable-next-line no-alert
  //     alert(error);
  //   }
  // };

  return (
    // <>
    //   <div className="min-h-full flex items-center justify-center py-12 px-6 sm:px-8 lg:px-10">
    //     <div className="max-w-sm w-fit space-y-8">
    //       <div>
    //         <img
    //           className="mx-auto h-20 w-auto"
    //           src={logo}
    //           alt="logo"
    //         />
    //         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
    //       </div>
    //       <form className="mt-8 space-y-6" onSubmit={(event) => handleSubmit(event)}>
    //         <input type="hidden" name="remember" defaultValue="true" />
    //         <div className="rounded-md shadow-sm -space-y-px">
    //           <div>
    //             <label htmlFor="email-address" className="sr-only">
    //               Email address
    //             </label>
    //             <input
    //               id="email-address"
    //               name="email"
    //               type="email"
    //               autoComplete="email"
    //               required
    //               onChange={(e) => setEmail(e.target.value)}
    //               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //               placeholder="Email address"
    //             />
    //           </div>
    //           <div>
    //             <label htmlFor="password" className="sr-only">
    //               Password
    //             </label>
    //             <input
    //               id="password"
    //               name="password"
    //               type="password"
    //               autoComplete="current-password"
    //               onChange={(e) => setPassword(e.target.value)}
    //               required
    //               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //               placeholder="Password"
    //             />
    //           </div>
    //         </div>

    //         <div className="flex items-center justify-end">
    //           <div className="text-sm">
    //             <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
    //               Forgot your password?
    //             </a>
    //           </div>
    //         </div>

    //         <div>
    //           <button
    //             type="submit"
    //             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //           >
    //             Sign in
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </>
  // );
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
          <input {...register('username', { required: true, minLength: 2, maxLength: 20 })} id="username" className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name"type="text" />
          {errors.username?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Please enter a user name.</p>)}
          {errors.username?.type === 'minLength' && (<p style={{ color: 'red', fontSize: '14px' }}> Name should have a mininum of 2 characters.</p>)}
          <label htmlFor="email" className="label sr-only">Email</label>
          <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email"
           type="email" />
          {errors.email?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Email address is required.</p>)}
          {errors.email?.type === 'pattern' && (<p style={{ color: 'red', fontSize: '14px' }}> Please enter an email address.</p>)}
          {errors.email && (<p style={{ color: 'red', fontSize: '14px' }}> {errors.email.message}</p>)}
          <label htmlFor="password" className="label sr-only">Password</label>
          <input {...register('password', { required: true, pattern: /^.{6,}$/ })}
            className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password" type="password" />
          {errors.password?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Password is required.</p>)}
          {errors.password?.type === 'pattern' && (<p style={{ color: 'red', fontSize: '14px' }}> The password should have at least 6 characters.</p>)}
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
            {errors.learnLanguageId && (<p style={{ color: 'red', fontSize: '14px' }}>errors.learnLanguageId.message</p>)}
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
            Sign in
          </button>
          </div>
         </form>
       </div>
      </div>
     </div>
  );
}
