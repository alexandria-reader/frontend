import { useState } from 'react';
import axios from 'axios';

const loginUser = async function(credentials) {
  const request = await axios.post('http://localhost:3000/api/login', credentials).then((response) => response.data);
  return request;
};

export default function Login({ setToken, setUser }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const user = {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    console.log(token);
    setToken(token);
    setUser(user);
    localStorage.setItem('token', JSON.stringify(token));
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
