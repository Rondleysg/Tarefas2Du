import React, {useEffect, useState} from 'react';
import {SectionList, Text, View} from 'react-native';
import styles from './styles';
import {Task} from '../../types/task';
import {db} from '../../libs/firebase/config';
import useTasks from '../../hooks/useTasks';
import TaskItemLimited from '../../components/TaskItemLimited';
import {getWeekNumber} from '../../utils/date';

export default function MyTasks() {
  const {tasks, setTasks} = useTasks();
  const [tasksToday, setTasksToday] = useState<Task[]>([]);
  const [tasksTomorrow, setTasksTomorrow] = useState<Task[]>([]);
  const [tasksNextWeek, setTasksNextWeek] = useState<Task[]>([]);
  const [tasksSomeday, setTasksSomeday] = useState<Task[]>([]);
  const dateToday = new Date();

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

  const getTasksToday = () => {
    setTasksToday(
      tasks.filter(
        task =>
          task.day === dateToday.getDate() &&
          task.month === dateToday.getMonth() &&
          task.year === dateToday.getFullYear(),
      ),
    );
  };

  const getTasksTomorrow = () => {
    setTasksTomorrow(
      tasks.filter(
        task =>
          task.day === dateToday.getDate() + 1 &&
          task.month === dateToday.getMonth() &&
          task.year === dateToday.getFullYear(),
      ),
    );
  };

  const getTasksNextWeek = () => {
    const currentWeek = getWeekNumber(dateToday);
    setTasksNextWeek(
      tasks.filter(task => {
        const taskWeek = getWeekNumber(new Date(task.completeDate * 1000));
        if (taskWeek === currentWeek + 1) {
          return task;
        }
      }),
    );
  };

  const getTasksSomeday = () => {
    setTasksSomeday(
      tasks.filter(
        task =>
          task.month >= dateToday.getMonth() + 1 &&
          task.year >= dateToday.getFullYear(),
      ),
    );
  };

  useEffect(() => {
    getTasksToday();
    getTasksTomorrow();
    getTasksNextWeek();
    getTasksSomeday();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
