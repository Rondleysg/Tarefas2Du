//React
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Pages
import {Login} from './pages/Login';
import {Signup} from './pages/Signup';
import AppTabRoutes from './pages/AppTabRoutes';

//Hooks
import useUser from './hooks/useUser';

const Stack = createStackNavigator();

export function RootStack({loading}: {loading: boolean}) {
  const {user} = useUser();

  if (loading) {
    return <></>;
  }

  return (
    <>
      {user ? (
        <Stack.Navigator>
          <Stack.Group
            screenOptions={{
              headerStyle: {
                height: 0,
              },
              title: '',
            }}>
            <Stack.Screen name="Home" component={AppTabRoutes} />
          </Stack.Group>
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
              title: '',
            }}>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Group>
        </Stack.Navigator>
      )}
    </>
  );
}
