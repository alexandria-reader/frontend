import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import userServices from '../services/users';
import { languagesState } from '../states/recoil-states';
import Nav from './Nav';

export default function SignUp() {
  const languages = useRecoilValue(languagesState);
  const { register, formState: { errors }, handleSubmit } = useForm();

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
             alert('Leaning language cannot be the same as known language');
           }
           const user = {
             username: data.username,
             email: data.email,
             password: data.password,
             current_known_language_id: data.currentKnownId,
             current_learn_language_id: data.currentLearnId,
           };
           await userServices.addUser(user);
         })}>
           <label className="label">Name</label>
           <input {...register('username', { required: true, minLength: 3 })} className="input" type="text" />
           {errors.firstName?.type === 'required' && 'A name of at least 3 characters is required'}
           <br></br>
           <label className="label">Email</label>
           <input {...register('email')} className="input"
            type="email" />
          <br></br>
           <label className="label">Password</label>
           <input {...register('password')}
            className="input" type="password" />
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
