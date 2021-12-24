// import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route, Routes,
} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Settings from './components/Settings';
import Texts from './components/Texts';
import SingleTextBody from './components/SingleText';
import Words from './components/Words';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
// import UserContext from './contexts/UserContext';
import './App.css';

function App() {
  // const [user, setUser] = useState(null);
  // const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  // if (!user) {
  //   return <LogIn setUser={setUser} />;
  // }

  return (
    <Router>
      <div className="app">
        {/* <UserContext.Provider value={providerValue}> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/texts" element={<Texts />} />
          <Route path="/texts/:textId" element={<SingleTextBody text={{
            id: 1,
            userId: 0,
            languageId: '',
            title: '',
            author: undefined,
            body: '',
            sourceURL: undefined,
            sourceType: undefined,
            uploadTime: undefined,
            isPublic: undefined,
          }} />} />
          <Route path="/words" element={<Words />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/logout" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
        {/* </ UserContext.Provider> */}
      </div>
    </Router>
  );
}

export default App;
