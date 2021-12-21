import React, { useState } from "react";
import Home from './components/Home';
import About from './components/About';
import Settings from './components/Settings';
import Texts from './components/Texts';
import Words from './components/Words';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';

import {
  BrowserRouter as Router,
  Route, Routes,
} from 'react-router-dom';
import './App.css';

function App() {
  // const loggedIn = ?
  const [text, setText]: [text: null | Text, setText: Function] = useState(null);
  // const [words, setWords] = useState([]);

  const openText = function(_event: Event, text: Text) {
    console.log(text);
    setText(text)
  }
  
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/texts" element={<Texts openText={openText}/>} />
          <Route path="/words" element={<Words />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
        {/* {loggedIn ?} */}
      </div>
    </Router>
  );
}

export default App;
