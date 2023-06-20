// ** React Imports
import {useContext} from 'react';

// ** Context Imports
import UserContext from '../context/User';

export default function useUser() {
  const {user, setUser} = useContext(UserContext);
  return {user, setUser};
}
