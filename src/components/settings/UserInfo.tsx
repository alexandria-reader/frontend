import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import userServices from '../../services/users';
import { userState } from '../../states/recoil-states';

export default function UserInfo() {
  const [user, setUser] = useRecoilState(userState);
  const [usermessage, setUsermessage] = useState('');
  const [showUserMessage, setShowUserMessage] = useState(true);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: 'onSubmit',
  });

  const changeUserInfo: SubmitHandler<FieldValues> = async (data) => {
    const response = await userServices.updateInfo(data.username, data.email);
    if (typeof response === 'object') {
      setUser(response);
      setUsermessage('User information updated');
    } else {
      setError('email', { type: 'email', message: 'Email already exists.' });
    }
  };

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

  return (
    <div>
      <form key={1} onSubmit={handleSubmit(changeUserInfo)}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-tertiary sm:p-6 flex flex-col gap-4">
            <div>
              <h2 className="text-xl text-secondary tracking-normal">
                Update your display name and email
              </h2>
              <p className="text-sm text-green-600 font-bold">
                {showUserMessage && usermessage}
              </p>
            </div>

            <div>
              <label className="label text-sm mb-6" htmlFor="username">
                Name
              </label>
              <input
                {...register('username', {
                  required: true,
                  minLength: 2,
                  maxLength: 20,
                })}
                id="username"
                name="username"
                defaultValue={user?.username}
                className="input appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-four dark:border-transparent placeholder-gray-500 text-tertiary focus:outline-none focus:ring-0 dark:focus:border-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                type="text"
              />
              {errors.username?.type === 'required' && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {' '}
                  Please enter a user name.
                </p>
              )}
              {errors.username?.type === 'minLength' && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {' '}
                  Name should have a mininum of 3 characters.
                </p>
              )}
              {errors.username?.type === 'maxLength' && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {' '}
                  Name should have a maxinum of 20 characters.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="label text-sm mb-6">
                Email
              </label>
              <input
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                id="email"
                name="email"
                autoComplete="email"
                className="input bg-four dark:border-transparent appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                defaultValue={user?.email}
                type="email"
              />
              {errors.email?.type === 'required' && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {' '}
                  Email address is required.
                </p>
              )}
              {errors.email?.type === 'pattern' && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {' '}
                  Please enter an email address.
                </p>
              )}
              {errors.email && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                type="submit"
                name="button-name-email"
                className="relative button-name-email inline-flex items-center px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
