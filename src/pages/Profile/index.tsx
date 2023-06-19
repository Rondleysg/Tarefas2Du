import React from 'react';
import {Text, View, Image} from 'react-native';
import useUser from '../../hooks/useUser';
import styles from './styles';
import {Button} from 'react-native-paper';
import {auth} from '../../libs/firebase/config';
import RNRestart from 'react-native-restart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Line} from '../../components/Line';
import CardStatistics from '../../components/CardStatistics';

interface ProfileProps {}

export default function Profile({}: ProfileProps) {
  const {user} = useUser();
  if (!user) {
    RNRestart.restart();
    return <></>;
  }

  return (
    <View style={styles.containerMain}>
      <Text style={styles.title}>Seu Perfil</Text>
      <View style={styles.containerInfos}>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={{uri: user.photoUrl}} />
          <Button disabled>
            <Text style={styles.btnEdit}>Editar</Text>
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
      <View style={styles.containersContent}>
        <View style={styles.containerStatistics}>
          <CardStatistics text="Quantidade de Tarefas Criadas:" value="0" />
          <CardStatistics text="Quantidade de Tarefas Finalizadas:" value="0" />
          <CardStatistics text="Quantidade de Tarefas Pendentes:" value="0" />
          <Line style={styles.line} />
        </View>
        <View style={styles.containerButtons}>
          <Line style={styles.line} />
          <Button
            onPress={() => {
              auth.signOut().then(() => {
                RNRestart.restart();
              });
            }}>
            <Text style={styles.btnText}>Sair</Text>
          </Button>
          <Line style={styles.line} />
        </View>
      </View>
    </View>
  );
}
