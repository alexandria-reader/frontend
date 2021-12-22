import React, { useState } from "react";
import axios from 'axios';

const loginUser = async function(credentials) {
  const userInfo = JSON.stringify(credentials);
  const request = await axios.post('http://localhost:3000/api/login', userInfo).then(response => response.data.json());
  
  return request.data;
}

export default function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
      const token = await loginUser({
        username,
        password
      });
      setToken(token);
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}