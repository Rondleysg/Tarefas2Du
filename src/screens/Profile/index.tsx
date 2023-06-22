// ** React Imports
import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';

// ** Hooks Imports
import useUser from '../../hooks/useUser';
import useTasks from '../../hooks/useTasks';

// ** Styles Imports
import styles from './styles';

// ** Components Imports
import {Button} from 'react-native-paper';

// ** Services Imports
import RNRestart from 'react-native-restart';
import {Line} from '../../components/Line';
import CardStatistics from '../../components/CardStatistics';
import {UserService} from '../../services/UserService';
import {ItemEditable} from '../../components/ItemEditable';

interface ProfileProps {}

export default function Profile({}: ProfileProps) {
  const {user, setUser} = useUser();
  const {tasks} = useTasks();
  const [userName, setUserName] = useState(user ? user.name : '');
  const [userEmail, setUserEmail] = useState(user ? user.email : '');
  const qntTasksCreated = tasks.length;
  const qntTasksCompleted = tasks.filter(task => task.completed).length;
  const qntTasksPending = qntTasksCreated - qntTasksCompleted;

  const handleLogout = () => {
    UserService.disconnectUser().then(() => {
      RNRestart.restart();
    });
  };

  const handleEditingName = (text: string) => {
    if (!user) {
      return;
    }
    UserService.updateUserName(user, text);
    setUser({...user, name: text});
  };

  const handleEditingEmail = (text: string) => {
    if (!user) {
      return;
    }
    UserService.updateUserEmail(user, text);
    setUser({...user, email: text});
  };

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
          <ItemEditable
            text={user.name}
            style={styles.name}
            onChangeText={text => setUserName(text)}
            onEdit={() => handleEditingName(userName)}
          />
          <ItemEditable
            text={user.email}
            style={styles.email}
            onChangeText={text => setUserEmail(text)}
            onEdit={() => handleEditingEmail(userEmail)}
          />
        </View>
      </View>
      <View style={styles.containersContent}>
        <View style={styles.containerStatistics}>
          <CardStatistics
            text="Quantidade de Tarefas Criadas:"
            value={qntTasksCreated}
          />
          <CardStatistics
            text="Quantidade de Tarefas Finalizadas:"
            value={qntTasksCompleted}
          />
          <CardStatistics
            text="Quantidade de Tarefas Pendentes:"
            value={qntTasksPending}
          />
          <Line style={styles.line} />
        </View>
        <View style={styles.containerButtons}>
          <Line style={styles.line} />
          <Button onPress={handleLogout}>
            <Text style={styles.btnText}>Sair</Text>
          </Button>
          <Line style={styles.line} />
        </View>
      </View>
    </View>
  );
}

// ! Note: This screen is not finished yet.
