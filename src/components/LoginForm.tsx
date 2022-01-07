/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { userState } from '../states/recoil-states';

import loginService from '../services/login';

const logo = require('../assets/logo/logo-light.png');

export default function LoginForm({ from }: { from: string }) {
  const setUser = useSetRecoilState(userState);

  const {
    register, formState: { errors }, handleSubmit, setError, reset,
  } = useForm({
    mode: 'onSubmit',
  });

  const navigate = useNavigate();
  console.log(from);

  const userInfo = (async (data: { email: string; password: string; }) => {
    const newUserData = {
      email: data.email,
      password: data.password,
    };

    const response = await loginService.loginUser(newUserData);
    if (typeof response === 'string') {
      setError('password', { type: 'password', message: 'Email and password do not match' });
      const timeId = setTimeout(() => {
        reset();
      }, 3000);

      return () => {
        clearTimeout(timeId);
      };
    }

    setUser(response);
    localStorage.setItem('alexandria-user-token', response.token);
    navigate('/texts');
    return null;
  }
  );

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-6 sm:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:py-6 sm:px-6 lg:px-8">
        <div>
          <img
            className="mx-auto h-24 w-auto"
            src={logo}
            alt="logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 py-10">Log in to your account</h2>
        </div>
        <form key={1} className='form-div' onSubmit={handleSubmit(userInfo)}>
          <label htmlFor="email" className="label text-sm mb-6" >Email</label>
          <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
          type="email" />
          {errors.email?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Email address is required.</p>)}
          {errors.email?.type === 'pattern' && (<p style={{ color: 'red', fontSize: '14px' }}> Please enter a valid email address.</p>)}
          <label htmlFor="password" className="label text-sm mb-6">Password</label>
          <input {...register('password', { required: true })}
            className="input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
            type="password" />
          {errors.password?.type === 'required' && (<p style={{ color: 'red', fontSize: '14px' }}> Password is required.</p>)}
          {errors.passwordCheck && (<p style={{ color: 'red', fontSize: '14px' }}> {errors.passwordCheck.message}</p>)}
          <div className="py-10">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
              Log in
            </button>
          </div>
          </form>
          </div>
        </div>
  );
}
