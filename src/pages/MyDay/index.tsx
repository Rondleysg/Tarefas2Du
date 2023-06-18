/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import useUser from '../../hooks/useUser';
import useTasks from '../../hooks/useTasks';
import {NavigationProp} from '@react-navigation/native';
import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';
import {getCurrentDayText} from '../../utils/date';
import TaskItem from '../../components/TaskItem';
import FabButton from '../../components/FabButton';
import {Task} from '../../types/task';
import {SheetManager} from 'react-native-actions-sheet';
import {db} from '../../libs/firebase/config';
import {Line} from '../../components/Line';

interface MyDayProps {
  navigation: NavigationProp<any, any>;
}

export default function MyDay({navigation}: MyDayProps) {
  const {user} = useUser();
  const [day, _setDay] = useState(getCurrentDayText());
  const {tasks, setTasks} = useTasks();
  const [tasksToday, setTasksToday] = useState<Task[]>([]);

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

  useEffect(() => {
    const getTasksToday = () => {
      const tasksTodayAux = tasks.filter(task => {
        const date = new Date();
        return (
          task.day === date.getDate() &&
          task.month === date.getMonth() &&
          task.year === date.getFullYear()
        );
      });
      setTasksToday(tasksTodayAux);
    };
    getTasksToday();
  }, [tasks]);

  return (
    <View style={styles.containerMain}>
      <Text style={styles.title}>Seu dia</Text>
      <View style={styles.containerTasks}>
        <Text style={styles.subTitle}>{day} - Hoje</Text>
        <Text style={styles.quantityTasks}>
          Você tem {tasksToday.length} tarefas
        </Text>
        <FlatList
          data={tasksToday.sort((a, b) => {
            if (a.completeDate && b.completeDate) {
              if (a.completeDate === b.completeDate) {
                return 0;
              }
              return a.completeDate < b.completeDate ? 1 : -1;
            }
            return 0;
          })}
          style={styles.list}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.task}>
              <Line />
              <TaskItem taskItem={item} onPress={() => handleCheckTask(item)} />
            </View>
          )}
        />
      </View>
      <FabButton
        onClick={() => {
          SheetManager.show('modal-register');
        }}
      />
    </View>
  );
}
