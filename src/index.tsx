import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route, Routes,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import App from './App';
import Home from './components/Home';
import About from './components/About';
import Settings from './components/Settings';
import Words from './components/Words';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import SingleText from './components/texts/SingleText';
import UserTexts from './components/texts/UserTexts';

import getToken from './utils/getToken';

import './index.css';
import './App.css';

<link href="/dist/output.css" rel="stylesheet"></link>;

const rootElement = document.getElementById('root');
const token = getToken();

render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={token ? <UserTexts /> : < Home />}/>
            <Route path="texts" element={<UserTexts />}/>
              <Route path="texts/:textId" element={<SingleText />}/>
            <Route path="words" element={<Words />}/>
            <Route path="logout" element={<Home />} />
            <Route path="settings" element={<Settings />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route
              path="*"
              element={
                <main>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  rootElement,
);
