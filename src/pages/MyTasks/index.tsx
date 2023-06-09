import React from 'react';
import {Text, View} from 'react-native';
import useUser from '../../hooks/useUser';
import {NavigationProp} from '@react-navigation/native';
import styles from './styles';

interface MyTasksProps {
  navigation: NavigationProp<any, any>;
}

export default function MyTasks({navigation}: MyTasksProps) {
  const {user} = useUser();
  if (!user) {
    navigation.navigate('Login');
    return <></>;
  }
  return (
    <View style={styles.containerMain}>
      <Text style={styles.title}>Suas Tarefas</Text>
    </View>
  );
}
