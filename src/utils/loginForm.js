import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { currentUserLanguagesState } from '../states/recoil-states';

// import UserContext from '../contexts/UserContext';

const loginUser = async function(credentials) {
  const request = await axios.post('http://localhost:3000/api/login', credentials).then((response) => response);
  return request;
};

export default function LoginForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const setCurrentUserLanguages = useSetRecoilState(currentUserLanguagesState);

  // const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email,
        password,
      });

      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));

      const currentUserLangs = {
        currentKnownLanguageId: user.currentKnownLanguageId,
        currentLearnLanguageId: user.currentLearnLanguageId,
      };

      setCurrentUserLanguages(currentUserLangs);
      navigate('/texts');
    // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (e) {
      alert(e.message);
    }
  };


  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
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
