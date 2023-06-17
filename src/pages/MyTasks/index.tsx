import React from 'react';
import {SectionList, Text, View} from 'react-native';
import useUser from '../../hooks/useUser';
import {NavigationProp} from '@react-navigation/native';
import styles from './styles';
import {Task} from '../../types/task';
import {db} from '../../libs/firebase/config';
import useTasks from '../../hooks/useTasks';
import TaskItemLimited from '../../components/TaskItemLimited';

interface MyTasksProps {
  navigation: NavigationProp<any, any>;
}

export default function MyTasks({navigation}: MyTasksProps) {
  const {user} = useUser();
  const {tasks, setTasks} = useTasks();

  if (!user) {
    navigation.navigate('Login');
    return <></>;
  }

  const handleCheckTask = async (task: Task) => {
    const tasksRef = db.collection('tasks');
    tasksRef
      .doc(task.id)
      .update({
        completed: !task.completed,
      })
      .then(() => {
        const tasksAux = tasks.map(taskAux => {
          if (taskAux.id === task.id) {
            taskAux.completed = !taskAux.completed;
          }
          return taskAux;
        });
        setTasks(tasksAux);
      });
  };

  return (
    <View style={styles.containerMain}>
      <Text style={styles.title}>Suas Tarefas</Text>
      <View style={styles.containerTasks}>
        <SectionList
          sections={[
            {title: 'Hoje', data: tasks},
            {
              title: 'Amanhã',
              data: tasks,
            },
          ]}
          renderItem={({item}) => (
            <TaskItemLimited
              taskItem={item}
              onPress={() => handleCheckTask(item)}
            />
          )}
          renderSectionHeader={({section}) => (
            <Text style={styles.subTitle}>{section.title}</Text>
          )}
          keyExtractor={item => `basicListEntry-${item}`}
        />
      </View>
    </View>
  );
}
