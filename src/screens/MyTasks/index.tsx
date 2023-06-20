// ** React Imports
import React, {useCallback, useEffect, useState} from 'react';
import {SectionList, Text, View} from 'react-native';

// ** Styles Imports
import styles from './styles';

// ** Types Imports
import {Task} from '../../types/task';

// ** Hooks Imports
import useTasks from '../../hooks/useTasks';

// ** Components Imports
import TaskItemLimited from '../../components/TaskItemLimited';

// ** Services Imports
import {TaskService} from '../../services/TaskService';

export default function MyTasks() {
  const {tasks, setTasks} = useTasks();
  const [tasksToday, setTasksToday] = useState<Task[]>([]);
  const [tasksTomorrow, setTasksTomorrow] = useState<Task[]>([]);
  const [tasksNextWeek, setTasksNextWeek] = useState<Task[]>([]);
  const [tasksSomeday, setTasksSomeday] = useState<Task[]>([]);

  const handleCheckTask = async (task: Task) => {
    TaskService.markTaskAsCompleted(task);
    const tasksAux = tasks.map(taskAux => {
      if (taskAux.id === task.id) {
        taskAux.completed = !taskAux.completed;
      }
      return taskAux;
    });
    setTasks(tasksAux);
  };

  const getTasksToday = useCallback(async () => {
    const tasksTodayAux = await TaskService.getTasksToday(tasks);
    setTasksToday(tasksTodayAux);
  }, [tasks]);

  const getTasksTomorrow = useCallback(async () => {
    const tasksTomorrowAux = await TaskService.getTasksTomorrow(tasks);
    setTasksTomorrow(tasksTomorrowAux);
  }, [tasks]);

  const getTasksNextWeek = useCallback(async () => {
    const tasksNextWeekAux = await TaskService.getTasksNextWeek(tasks);
    setTasksNextWeek(tasksNextWeekAux);
  }, [tasks]);

  const getTasksSomeday = useCallback(async () => {
    const tasksSomedayAux = await TaskService.getTasksSomeday(tasks);
    setTasksSomeday(tasksSomedayAux);
  }, [tasks]);

  useEffect(() => {
    getTasksToday();
    getTasksTomorrow();
    getTasksNextWeek();
    getTasksSomeday();
  }, [getTasksToday, getTasksTomorrow, getTasksNextWeek, getTasksSomeday]);

  return (
    <View style={styles.containerMain}>
      <Text style={styles.title}>Suas Tarefas</Text>
      <View style={styles.containerTasks}>
        <SectionList
          sections={[
            {
              title: 'Hoje',
              data: tasksToday,
            },
            {
              title: 'Amanhã',
              data: tasksTomorrow,
            },
            {
              title: 'Próximos 7 dias',
              data: tasksNextWeek,
            },
            {
              title: 'Algum dia',
              data: tasksSomeday,
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
          keyExtractor={item => `basicListEntry-${item.id}`}
        />
      </View>
    </View>
  );
}
