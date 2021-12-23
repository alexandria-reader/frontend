import { useState, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Route, Routes,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Home from './components/Home';
import About from './components/About';
import Settings from './components/Settings';
import Texts from './components/Texts';
import Words from './components/Words';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import UserContext from './contexts/UserContext';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <div className="app">
        <UserContext.Provider value={providerValue}>
          <RecoilRoot>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/words" element={<Words />} />
              <Route path="/texts" element={<Texts />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/logout" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </RecoilRoot>
        </ UserContext.Provider>
        {/* {loggedIn ?} */}
      </div>
    </Router>
  );
}

export default App;
