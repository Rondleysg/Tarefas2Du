import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {RootStack} from './Routes';
import {SheetProvider} from 'react-native-actions-sheet';
import './libs/sheets';
import {User} from './types/user';
import {auth, db} from './libs/firebase/config';
import UserContext from './context/User';
import {Task} from './types/task';
import TaskContext from './context/Tasks';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const getTasks = async (userId: string) => {
    const tasksRef = db.collection('tasks');
    const doc = await tasksRef
      .where('userId', '==', userId)
      .orderBy('completeDate', 'desc')
      .get();
    const tasksAux: Task[] = [];
    doc.forEach(task => {
      const taskData = task.data() as Task;
      taskData.id = task.id;
      tasksAux.push(taskData);
    });
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
