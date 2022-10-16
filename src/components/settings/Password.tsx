import { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import userServices from '../../services/users';

export default function Languages() {
  const [passwordmessage, setPasswordmessage] = useState('');
  const [showPasswordmessage, setShowPasswordmessage] = useState(true);

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    setError: setError2,
    reset,
  } = useForm({
    mode: 'onSubmit',
  });

  const changePassword: SubmitHandler<FieldValues> = async (data) => {
    const response = await userServices.updatePassword(
      data.password1,
      data.password2
    );
    if (data.password2 !== data.password3) {
      setError2('checkInputPasswords', {
        type: 'password',
        message: 'New passwords do not match',
      });

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

  return (
    <div>
      <form key={2} onSubmit={handleSubmit2(changePassword)}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-tertiary sm:p-6  flex flex-col gap-4">
            <div className="">
              <h2 className="text-xl text-secondary mb-3 tracking-normal">
                Update your password
              </h2>
              <p className="password-message text-sm text-green-600 font-bold">
                {showPasswordmessage && passwordmessage}
              </p>
              <p className="text-secondary text-sm">
                Update password by providing a new one with the current
                password:
              </p>
            </div>

            <div className="hidden">
              <label htmlFor="username-hidden" className="label text-sm">
                Username
              </label>
              <input
                id="username-hidden"
                autoComplete="username"
                className="input bg-four dark:border-transparent appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                type="text"
              />
            </div>

            <div>
              <label htmlFor="password1" className="label text-sm">
                Current Password
              </label>
              <input
                {...register2('password1', {
                  required: true,
                  pattern: /^.{6,}$/,
                })}
                id="password"
                autoComplete="current-password"
                className="input bg-four dark:border-transparent appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                type="password"
              />
              {errors2.password1?.type === 'required' && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {' '}
                  Password is required{' '}
                </p>
              )}
              {errors2.password1?.type === 'pattern' && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {' '}
                  The password should have at least 6 characters
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password2" className="label text-sm">
                New Password
              </label>
              <input
                {...register2('password2', {
                  required: true,
                  pattern: /^.{6,}$/,
                })}
                id="password2"
                autoComplete="new-password"
                className="input bg-four dark:border-transparent appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                type="password"
              />
              {errors2.password2?.type === 'required' && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {' '}
                  Password is required{' '}
                </p>
              )}
              {errors2.password2?.type === 'pattern' && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {' '}
                  The password should have at least 6 characters
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password3" className="label text-sm">
                New Password Again
              </label>
              <input
                {...register2('password3', {
                  required: true,
                  pattern: /^.{6,}$/,
                })}
                id="password3"
                autoComplete="new-password"
                className="input bg-four dark:border-transparent appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                type="password"
              />
              {errors2.password3?.type === 'required' && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {' '}
                  Password is required{' '}
                </p>
              )}
              {errors2.password3?.type === 'pattern' && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {' '}
                  The password should have at least 6 characters
                </p>
              )}
              {errors2.password && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {errors2.password.message}
                </p>
              )}
              {errors2.checkInputPasswords && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {errors2.checkInputPasswords.message}
                </p>
              )}
            </div>

            <div className="pt-2 text-right">
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
    </div>
  );
}
