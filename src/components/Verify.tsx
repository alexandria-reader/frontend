/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { userState } from '../states/recoil-states';

import userServices from '../services/users';
import getToken from '../utils/getToken';
import verify from '../services/verify';

export default function Verified() {
  const [user, setUser] = useRecoilState(userState);
  const [sent, setSent] = useState(false);

  const setVerification = async function () {
    const localToken = getToken();

    if (user && typeof localToken === 'string') {
      const tokenUser = await userServices.getUserFromToken(localToken);
      setUser({ ...user, verified: tokenUser.verified });
    }
  };

  useEffect(() => {
    setVerification();
  }, []);

  const sendMail = async function () {
    if (!sent) {
      const response = await verify.resendEmail();
      setSent(response);
    }
  };

  return (
    <>
      {user && user.verified === true ? (
        <div>
          <div className="bg-secondary text-black overflow-hidden relative lg:flex lg:items-center">
            <div className="py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
              <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
                <span className="block">
                  Your email address has been verified.
                </span>
              </h2>
              <div className="text-md mt-4 text-secondary">
                <p className="pb-2">
                  That means you can add your own texts and start reading and
                  learning.
                </p>
              </div>
              <div className="lg:mt-0 lg:flex-shrink-0">
                <div className="mt-12 inline-flex rounded-md shadow">
                  <Link to="/texts">
                    <button
                      type="button"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                      Go to texts
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-secondary text-black overflow-hidden relative lg:flex lg:items-center">
            <div className="py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
              <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
                <span className="block">
                  Your email address has not been verified, yet.
                </span>
              </h2>
              <div className="text-md mt-4 text-secondary">
                <p className="pb-2">
                  That means you can have a look around but won't be able to add
                  your own texts.
                </p>
                <p className="pb-2">
                  We have sent an email to the address you gave us when you
                  signed up.
                  <br />
                  Please click the link in that email to verify your address.
                  <br />
                  Don't forget to check your spam folder and look for{' '}
                  <em>read.with.alexandria</em>.
                </p>
                <p className="pb-2">
                  If you cannot find it, click the link to resend the email.
                </p>
              </div>
              <div className="lg:mt-0 lg:flex-shrink-0">
                <div className="mt-12 inline-flex rounded-md shadow">
                  {sent === false ? (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        sendMail();
                      }}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                      Resend email
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500"
                    >
                      Mail sent
                    </button>
                  )}
                </div>
                <div className="mt-12 ml-8 inline-flex rounded-md shadow">
                  <Link to="/texts">
                    <button
                      type="button"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-fuchsia-800 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                      Look around
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
