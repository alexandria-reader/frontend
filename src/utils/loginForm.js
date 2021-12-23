import { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../contexts/UserContext';

const loginUser = async function(credentials) {
  const request = await axios.post('http://localhost:3000/api/login', credentials).then((response) => response.data);
  return request;
};

export default function LoginForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currUser = await loginUser({
      email,
      password,
    });
    console.log(user);
    setUser(currUser);
    localStorage.setItem('user', JSON.stringify(currUser));
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
