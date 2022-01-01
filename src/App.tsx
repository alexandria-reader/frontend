import { Outlet } from 'react-router';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen min-w-full bg-gray-100 flex flex-col">
          <Nav />
          <main className='container mx-auto'>
            <Outlet />
          </main>
          <Footer />
  </div>
  );
}

export default App;

