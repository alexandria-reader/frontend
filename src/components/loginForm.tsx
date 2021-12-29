import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { currentUserLanguagesState } from '../states/recoil-states';
import loginService from '../services/login';
import { User } from '../types';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setCurrentUserLanguages = useSetRecoilState(currentUserLanguagesState);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user: User = await loginService.loginUser({
        email,
        password,
      });

      localStorage.setItem('user', JSON.stringify(user));

      const currentUserLangs = {
        currentKnownLanguageId: user.currentKnownLanguageId,
        currentLearnLanguageId: user.currentLearnLanguageId,
      };

      setCurrentUserLanguages(currentUserLangs);
      navigate('/texts');
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };


  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form className='form-div' onSubmit={(event) => handleSubmit(event)}>
        <label>
          <p>Email</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
