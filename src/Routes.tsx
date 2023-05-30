import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Pages
import {Login} from './pages/Login';
import {Signup} from './pages/Signup';
import {Home} from './pages/Home';

const Stack = createStackNavigator();

export function RootStack() {
  return (
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
      <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
    </Stack.Navigator>
  );
}
