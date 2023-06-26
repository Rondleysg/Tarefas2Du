// ** React Imports
import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

// ** Hooks Imports
import useUser from '../../hooks/useUser';
import useTasks from '../../hooks/useTasks';

// ** Styles Imports
import styles from './styles';

// ** Utils Imports
import {getCurrentDayText} from '../../utils/date';

// ** Components Imports
import TaskItem from '../../components/TaskItem';
import FabButton from '../../components/FabButton';
import {Line} from '../../components/Line';

// ** Modal Imports
import {SheetManager} from 'react-native-actions-sheet';

// ** Types Imports
import {Task} from '../../types/task';

// ** Services Imports
import {TaskService} from '../../services/TaskService';

// ** Libs Imports
import RNRestart from 'react-native-restart';

export default function MyDay() {
  const {user} = useUser();
  const [day, _setDay] = useState(getCurrentDayText());
  const {tasks} = useTasks();
  const [tasksToday, setTasksToday] = useState<Task[]>([]);

  const getTasksToday = useCallback(async () => {
    const tasksTodayAux = await TaskService.getTasksToday(tasks);
    setTasksToday(tasksTodayAux);
  }, [tasks]);

  useEffect(() => {
    getTasksToday();
  }, [getTasksToday]);

  if (!user) {
    RNRestart.restart();
    return <></>;
  }

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
              <Line style={styles.line} />
              <TaskItem taskItem={item} />
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
