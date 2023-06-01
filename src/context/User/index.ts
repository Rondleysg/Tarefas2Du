import React from 'react';
import {User} from '../../types/user';

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const iUserContextState = {
  user: null,
  setUser: () => {},
};

const UserContext = React.createContext<UserContextType>(iUserContextState);

export default UserContext;
