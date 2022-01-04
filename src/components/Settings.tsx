import { useRecoilValue } from 'recoil';
import { userState } from '../states/recoil-states';


export default function Settings() {
  const user = useRecoilValue(userState);
  return (
    <div>
     Home
     <div> { user
       ? (`${user.username} is logged in`) : 'You are not logged in.'
     } </div>
    </div>
  );
}
