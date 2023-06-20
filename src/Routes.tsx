// ** React Imports
import React from 'react';

// ** Navigate Imports
import {createStackNavigator} from '@react-navigation/stack';

// ** Screens Imports
import {Login} from './screens/Login';
import {Signup} from './screens/Signup';
import AppTabRoutes from './screens/AppTabRoutes';

// ** Hooks Imports
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
