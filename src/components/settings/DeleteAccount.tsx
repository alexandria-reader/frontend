import { useState, Fragment, FormEvent } from 'react';
import { ExclamationIcon } from '@heroicons/react/outline';
import { Transition, Dialog } from '@headlessui/react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import userServices from '../../services/users';
import { userState } from '../../states/recoil-states';

export default function DeleteAccount() {
  const [openModal, setOpenModal] = useState(false);
  const [passwordIsConfirmed, setPasswordIsConfirmed] = useState(false);
  const [, setUser] = useRecoilState(userState);
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const confirmPassword = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const match = await userServices.confirmPassword(password);
    setPasswordIsConfirmed(match);
  };

  const removeUser = async function () {
    const response = await userServices.removeUser();
    if (response.status === 204) {
      setUser(null);
      localStorage.clear();
    }
  };

  return (
    <>
      <div className="shadow sm:rounded-md  border dark:border-red-800 border-red-600 sm:overflow-hidden">
        <div className="px-4 py-5 bg-tertiary  sm:p-6 flex flex-col gap-4">
          <div className="flex justify-between gap-6">
            <div>
              <p className="text-xl text-secondary mb-3 tracking-normal">
                Delete my account permanently
              </p>
              <p className="text-secondary text-sm">
                Once you delete your account, it cannot be recovered. Please be
                careful with this option.
              </p>
            </div>
            <button
              type="submit"
              onClick={() => setOpenModal(true)}
              className="relative inline-flex items-center px-8 py-2 border dark:border-gray-600 border-gray-400 rounded-md shadow-sm text-sm font-medium text-red-600 dark:bg-gray-700 bg-gray-200 dark:hover:bg-red-700 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-1 hover:text-white focus:ring-red-700"
            >
              Delete my account
            </button>
          </div>
        </div>
      </div>
      <Transition.Root show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => console.log('closed')}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-secondary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-secondary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-tertiary"
                      >
                        Delete text
                      </Dialog.Title>
                      <div className="mt-2 flex flex-col gap-4">
                        <p className="text-sm text-gray-500">
                          Are you sure you wish to delete your account? Once
                          deleted, it cannot be recovered. If so, please confirm
                          your password here:
                        </p>
                        <form
                          className="flex flex-row"
                          onSubmit={(event) => confirmPassword(event)}
                          action=""
                        >
                          <input
                            value={password}
                            onChange={(event) =>
                              setPassword(event?.target.value)
                            }
                            type="password"
                            autoComplete="new-password"
                            className="input bg-four dark:border-transparent appearance-none rounded-l-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                          />
                          <div className="hidden">
                            <label
                              htmlFor="username"
                              className="label hidden text-sm"
                            >
                              Username
                            </label>
                            <input
                              autoComplete="username"
                              name="username"
                              className="input hidden w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                              type="text"
                            />
                          </div>
                          <button
                            type="submit"
                            className="relative button-name-email inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                          >
                            Confirm
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-primary px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className={`${
                      passwordIsConfirmed
                        ? ' hover:bg-red-700 bg-red-600 focus:ring-red-500'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-400 pointer-events-none'
                    } w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
                    onClick={async () => {
                      if (passwordIsConfirmed) {
                        await removeUser();
                        window.scrollTo(0, 0);
                        navigate('/');
                      }
                    }}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-secondary text-base font-medium text-six hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setOpenModal(false);
                      setPassword('');
                      setPasswordIsConfirmed(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
