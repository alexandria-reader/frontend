// import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route, Routes,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Home from './components/Home';
import About from './components/About';
import Settings from './components/Settings';
import Words from './components/Words';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import SingleText from './components/texts/SingleText';
import './App.css';
import UserTexts from './components/texts/UserTexts';

function App() {
  return (
    <Router>
      <div className="app">
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<Home />} />
              <Route path="texts/" element={<UserTexts />} />
              <Route path="texts/:textId" element={<SingleText />} />
              <Route path="words" element={<Words />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<LogIn />} />
              <Route path="logout" element={<Home />} />
              <Route path="settings" element={<Settings />} />
              <Route path="about" element={<About />} />
              <Route
                path="*"
                element={
                  <main>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
          </Routes>
        </RecoilRoot>
      </div>
    </Router>
  );
}

export default App;
