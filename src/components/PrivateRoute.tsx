import { Navigate, useLocation } from 'react-router';
import { useRecoilValue } from 'recoil';
import { userState } from '../states/recoil-states';
// import getToken from '../utils/getToken';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useRecoilValue(userState);

  const location = useLocation();

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}
