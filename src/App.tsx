// ** React Imports
import React, {useEffect, useState} from 'react';

// ** Navigate Imports
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './Routes';

// ** Modal Imports
import {SheetProvider} from 'react-native-actions-sheet';
import './libs/sheets';

// ** Context Imports
import UserContext from './context/User';
import TaskContext from './context/Tasks';

// ** Services Imports
import {TaskService} from './services/TaskService';

// ** Types Imports
import {User} from './types/user';
import {Task} from './types/task';

// ** Firebase Imports
import {auth, db} from './libs/firebase/config';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const getTasks = async (userId: string) => {
    const tasksAux = await TaskService.getTasksByUserId(userId);
    setTasks(tasksAux);
  };

  useEffect(() => {
    const usersRef = db.collection('users');
    auth.onAuthStateChanged(userRes => {
      if (userRes) {
        usersRef
          .doc(userRes.uid)
          .get()
          .then(document => {
            if (!user) {
              const userData = document.data() as User;
              setLoading(false);
              if (userData) {
                setUser(userData);
              }
            }
          })
          .catch(_error => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
    if (user) {
      getTasks(user.id);
    }
  }, [user]);

  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
        <TaskContext.Provider value={{tasks, setTasks}}>
          <SheetProvider>
            <NavigationContainer>
              <RootStack loading={loading} />
            </NavigationContainer>
          </SheetProvider>
        </TaskContext.Provider>
      </UserContext.Provider>
    </>
  );
}
