import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import userServices from '../services/users';
import languageServices from '../services/languages';
import { languagesState } from '../states/recoil-states';
import Nav from './Nav';

export default function SignUp() {
  const [languages, setLanguages] = useRecoilState(languagesState);
  const { register, formState: { errors }, handleSubmit } = useForm();

  const getLanguageListFromServer = async function() {
    const dbLanguages = await languageServices.getAllLanguages();
    setLanguages(dbLanguages);
  };

  useEffect(() => {
    getLanguageListFromServer();
  }, []);

  return (
    <div>
     <Nav />
     <div>
      <div className="form">
        <div>
          <h1>User Registration</h1>
        </div>

         <form onSubmit={handleSubmit(async (data) => {
           if (data.currentKnownId === data.currentLearnId) {
             // this is still going through
             alert('Learning language cannot be the same as known language');
             return;
           }
           const user = {
             username: data.username,
             email: data.email,
             password: data.password,
             currentKnownLanguageId: data.currentKnownId,
             currentLearnLanguageId: data.currentLearnId,
           };
           const response = await userServices.addUser(user);
           console.log(response);
         })}>
           <label className="label">Name</label>
           <input {...register('username', { required: true, minLength: 3 })} className="input" type="text" />
           {errors.username?.type === 'required' && 'A name of at least 3 characters is required'}
           <br></br>
           <label className="label">Email</label>
           <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className="input"
            type="email" />
          {errors.email?.type === 'required' && ' Email address is required.'}
          <br></br>
           <label className="label">Password</label>
           <input {...register('password', { required: true })}
            className="input" type="password" />
          {errors.password?.type === 'required' && ' Password should have at least one lowercase, one uppercase letter, contains one number, and has a length of 6 or more.'}
            <br></br>
          <label htmlFor="currentKnownId">I know</label>
          {<select {...register('currentKnownId')}>
          {languages.map((lang) => <option key={lang.id} value={lang.id} >{lang.name}</option>)}
          </select>}
          <br></br>
          <label htmlFor="currentLearnId">I want to learn</label>
          {<select {...register('currentLearnId')}>
          {languages.map((lang) => <option key={lang.id} value={lang.id} >{lang.name}</option>)}
          </select>}
          <br></br>
          <input type="submit" />
         </form>
       </div>
      </div>
     </div>
  );
}
