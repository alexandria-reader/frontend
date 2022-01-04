import { useNavigate } from 'react-router-dom';

export default function logOut() {
  localStorage.removeItem('alexandria-user-token');
  const navigate = useNavigate();
  navigate('/');
}
