/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyDay from '../MyDay';
import Profile from '../Profile';
import MyTasks from '../MyTasks';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();

export default function AppTabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="MyDay"
      screenOptions={{
        title: '',
        headerStyle: {
          height: 0,
        },
        tabBarInactiveTintColor: '#A4A1A2',
        tabBarActiveTintColor: '#4AC356',
        tabBarStyle: {
          borderTopWidth: 0,
          borderTopColor: 'transparent',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="MyTasks"
        component={MyTasks}
        options={{
          tabBarLabel: 'Tarefas',
          tabBarIcon: ({color, focused}) => {
            if (focused) {
              return (
                <MaterialCommunityIcons
                  name="calendar-check"
                  color={color}
                  size={32}
                />
              );
            }
            return (
              <MaterialCommunityIcons
                name="calendar-check-outline"
                color={color}
                size={32}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="MyDay"
        component={MyDay}
        options={{
          tabBarLabel: ({focused}) => {
            if (focused) {
              return '';
            }
            return <Text>Meu dia</Text>;
          },
          tabBarIcon: ({color, focused}) => {
            if (focused) {
              return <></>;
            }
            return (
              <MaterialCommunityIcons
                name="calendar-today"
                color={color}
                size={32}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({color, focused}) => {
            if (focused) {
              return (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={32}
                />
              );
            }
            return (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={32}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
