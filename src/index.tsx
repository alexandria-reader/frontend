import React from 'react';
import { render } from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import './App.css';
import UserTexts from './components/texts/UserTexts';

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossOrigin="anonymous"
/>;

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            {/* <Route index element={<Home />}/> */}
            <Route path="texts" element={<UserTexts />}/>
              <Route path="texts/:textId" element={<SingleText />}/>
            <Route path="words" element={<Words />}/>
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
          </Route>
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  rootElement,
);
