import { useNavigate } from 'react-router-dom';

export default function logOut() {
  localStorage.setItem('user', '');
  const navigate = useNavigate();
  navigate('/');
}
