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
import NotFound from './components/NotFound';
import SingleText from './components/texts/SingleText';
import UserTexts from './components/texts/UserTexts';
import TextForm from './components/texts/TextForm';
import PrivateRoute from './components/PrivateRoute';
import Verify from './components/Verify';

import './index.css';
import './App.css';

<link href="/dist/output.css" rel="stylesheet"></link>;

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={< Home />}/>
            <Route path="texts" element={<PrivateRoute><UserTexts /></PrivateRoute>}/>
              <Route path="texts/new" element={<PrivateRoute><TextForm /></PrivateRoute>}/>
              <Route path="texts/edit" element={<PrivateRoute><TextForm /></PrivateRoute>}/>
              <Route path="texts/:textId" element={<PrivateRoute><SingleText /></PrivateRoute>}/>
              <Route path="texts/*" element={<PrivateRoute><NotFound /></PrivateRoute>}/>
            <Route path="words" element={<PrivateRoute><Words /></PrivateRoute>}/>
            <Route path="logout" element={<Home />} />
            <Route path="settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="verify" element={<PrivateRoute><Verify /></PrivateRoute>} />
            <Route path="*" element={<NotFound />}/>
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  rootElement,
);
