import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Pages
import {Login} from './pages/Login';
import {Signup} from './pages/Signup';
import {Home} from './pages/Home';
import {useState, useEffect} from 'react';
import {auth, db} from './libs/firebase/config';
import {User} from './types/user';

const Stack = createStackNavigator();

export function RootStack() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const usersRef = db.collection('users');
    auth.onAuthStateChanged(userRes => {
      if (userRes) {
        usersRef
          .doc(userRes.uid)
          .get()
          .then(document => {
            console.log(document.data());

            const userData = document.data() as User;
            setLoading(false);
            if (userData) {
              setUser(userData);
            }
          })
          .catch(_error => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <></>;
  }

  return user ? (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        children={() => <Home user={user} />}
        options={{title: 'Home'}}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Group
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4AC356',
            height: 10,
          },
          headerLeftLabelVisible: false,
          headerLeftContainerStyle: {opacity: 0},
        }}>
        <Stack.Screen name="Signup" component={Signup} options={{title: ''}} />
        <Stack.Screen name="Login" component={Login} options={{title: ''}} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
