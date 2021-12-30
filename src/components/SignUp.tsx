import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import userServices from '../services/users';
import languageServices from '../services/languages';
import loginService from '../services/login';
import { languagesState } from '../states/recoil-states';
import { User } from '../types';

export default function SignUp() {
  const navigate = useNavigate();
  const [languages, setLanguages] = useRecoilState(languagesState);
  const {
    register, formState: { errors }, handleSubmit, setError,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '', email: '', password: '', currentKnownLanguageId: 'en', currentLearnLanguageId: 'en', phone: '', website: '',
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
     <div>
      <div className="login-wrapper">
        <div>
          <h1>User Registration</h1>
        </div>

         <form className='form-div' onSubmit={handleSubmit(async (data) => {
           if (data.currentKnownLanguageId === data.currentLearnLanguageId) {
             setError('currentLearnLanguageId', { type: 'languages', message: ' Learning language cannot be the same as known language' });
             return;
           }
           if (data.phone || data.website) {
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
           } else if (response.status === 201) {
             const loggedInUser: User = await loginService.loginUser({
               email: user.email,
               password: user.password,
             });
             localStorage.setItem('user', JSON.stringify(loggedInUser));
             navigate('/texts');
           }
         })}>
           <label className="label">Name</label>
           <input {...register('username', { required: true, minLength: 3, maxLength: 20 })} className="input" type="text" />
           {errors.username?.type === 'required' && ' Please enter a user name.'}
           {errors.username?.type === 'minLength' && ' Name should have a mininum of 3 characters.'}
           <br></br>
           <label className="label">Email</label>
           <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className="input"
            type="email" />
           {errors.email?.type === 'required' && ' Email address is required.'}
           {errors.email?.type === 'pattern' && ' Please enter an email address.'}
           {errors.email && errors.email.message}
          <br></br>
           <label className="label">Password</label>
           <input {...register('password', { required: true, pattern: /^.{6,}$/ })}
            className="input" type="password" />
          {errors.password?.type === 'required' && ' Password is required.'}
          {errors.password?.type === 'pattern' && ' The password should have at least 6 characters.'}
            <br></br>
          <label htmlFor="currentKnownLanguageId">I know</label>
          {<select {...register('currentKnownLanguageId')} >
          {languages.map((lang) => <option key={lang.id} value={lang.id}>{lang.name}</option>)}
          </select>}
          <br></br>
          <label htmlFor="currentLearnLanguageId">I want to learn</label>
          {<select {...register('currentLearnLanguageId')}>
          {languages.map((lang) => <option key={lang.id} value={lang.id}>{lang.name}</option>)}
          </select>}
          {errors.currentLearnLanguageId && errors.currentLearnLanguageId.message}
          <br></br>
          <div className="userFields" aria-hidden="true">
          <label className="label phone">Phone number</label>
          <input {...register('phone')} className="input phone" type="text" tabIndex={-1}/>
          <label className="label website">Website</label>
          <input {...register('website')} className="input website" type="text" tabIndex={-1}/>
          <br></br>
          </div>
          <input type="submit" />
         </form>
       </div>
      </div>
     </div>
  );
}
