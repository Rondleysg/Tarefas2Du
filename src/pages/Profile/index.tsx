import React from 'react';
import {Text, View} from 'react-native';
import useUser from '../../hooks/useUser';
import {NavigationProp} from '@react-navigation/native';
import styles from './styles';
import {Button} from 'react-native-paper';
import {auth} from '../../libs/firebase/config';
import RNRestart from 'react-native-restart';

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
      <Button
        onPress={() => {
          auth.signOut().then(() => {
            RNRestart.restart();
          });
        }}>
        Fazer logout
      </Button>
    </View>
  );
}
