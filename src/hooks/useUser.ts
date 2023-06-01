import {useState} from 'react';
import {User} from '../types/user';

const useUser = (): [User | undefined, (user: User) => void] => {
  const [user, setUserState] = useState<User | undefined>(undefined);

  const setUser = (newUser: User) => {
    setUserState(newUser);
  };

  return [user, setUser];
};

export default useUser;
