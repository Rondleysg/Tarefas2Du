import React from 'react';
import {Text, View, Image} from 'react-native';
import useUser from '../../hooks/useUser';
import {NavigationProp} from '@react-navigation/native';
import styles from './styles';
import {Button} from 'react-native-paper';
import {auth} from '../../libs/firebase/config';
import RNRestart from 'react-native-restart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Line} from '../../components/Line';

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
      <View style={styles.containerInfos}>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={{uri: user.photoUrl}} />
          <Button disabled>
            <Text style={styles.btnText}>Editar</Text>
          </Button>
        </View>
        <View style={styles.containerFields}>
          <View style={styles.flexField}>
            <Text style={styles.name}>{user.name}</Text>
            <MaterialCommunityIcons
              disabled
              name={'pencil'}
              color="#a9a9a9"
              size={24}
            />
          </View>
          <View style={styles.flexField}>
            <Text style={styles.email}>{user.email}</Text>
            <MaterialCommunityIcons
              disabled
              name={'pencil'}
              color="#a9a9a9"
              size={24}
            />
          </View>
        </View>
      </View>
      <Line />
      <Text>Teste</Text>
      <Button
        onPress={() => {
          auth.signOut().then(() => {
            RNRestart.restart();
          });
        }}>
        Sair
      </Button>
    </View>
  );
}
