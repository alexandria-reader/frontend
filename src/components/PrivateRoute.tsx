import { Navigate, useLocation } from 'react-router';
import getToken from '../utils/getToken';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();

  if (!getToken()) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}
