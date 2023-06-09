import React from 'react';
import {Text, View} from 'react-native';
import useUser from '../../hooks/useUser';
import {NavigationProp} from '@react-navigation/native';
import styles from './styles';

interface ProfileProps {
  navigation: NavigationProp<any, any>;
}

export default function Profile({navigation}: ProfileProps) {
  const {user} = useUser();
  if (!user) {
    navigation.navigate('Login');
    return <></>;
  }
  return (
    <View style={styles.containerMain}>
      <Text style={styles.title}>Seu Perfil</Text>
    </View>
  );
}
