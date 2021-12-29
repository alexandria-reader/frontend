import { Outlet } from 'react-router';
import './App.css';
import Nav from './components/Nav';

function App() {
  return (
    <div className="app">
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;

