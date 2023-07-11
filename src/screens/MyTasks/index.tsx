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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MyTasks() {
  const {tasks, setTasks} = useTasks();
  const [tasksPending, setTasksPending] = useState<Task[]>([]);
  const [tasksToday, setTasksToday] = useState<Task[]>([]);
  const [tasksTomorrow, setTasksTomorrow] = useState<Task[]>([]);
  const [tasksNextWeek, setTasksNextWeek] = useState<Task[]>([]);
  const [tasksSomeday, setTasksSomeday] = useState<Task[]>([]);
  const [isOpenPending, setIsOpenPending] = useState<boolean>(true);
  const [isOpenToday, setIsOpenToday] = useState<boolean>(true);
  const [isOpenTomorrow, setIsOpenTomorrow] = useState<boolean>(true);
  const [isOpenNextWeek, setIsOpenNextWeek] = useState<boolean>(true);
  const [isOpenSomeday, setIsOpenSomeday] = useState<boolean>(true);

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
    const tasksTodayAux = TaskService.getTasksToday(tasks);
    setTasksToday(tasksTodayAux);
  }, [tasks]);

  const getTasksTomorrow = useCallback(async () => {
    const tasksTomorrowAux = TaskService.getTasksTomorrow(tasks);
    setTasksTomorrow(tasksTomorrowAux);
  }, [tasks]);

  const getTasksNextWeek = useCallback(async () => {
    const tasksNextWeekAux = TaskService.getTasksNextWeek(tasks);
    setTasksNextWeek(tasksNextWeekAux);
  }, [tasks]);

  const getTasksSomeday = useCallback(async () => {
    const tasksSomedayAux = TaskService.getTasksSomeday(tasks);
    setTasksSomeday(tasksSomedayAux);
  }, [tasks]);

  const getTasksPending = useCallback(async () => {
    const tasksPendingAux = TaskService.getTasksPending(tasks);
    setTasksPending(tasksPendingAux);
  }, [tasks]);

  useEffect(() => {
    getTasksToday();
    getTasksTomorrow();
    getTasksNextWeek();
    getTasksSomeday();
    getTasksPending();
  }, [
    getTasksToday,
    getTasksTomorrow,
    getTasksNextWeek,
    getTasksSomeday,
    getTasksPending,
  ]);

  const getSectionIsOpen = (sectionId: number): boolean => {
    switch (sectionId) {
      case 1:
        return isOpenPending;
      case 2:
        return isOpenToday;
      case 3:
        return isOpenTomorrow;
      case 4:
        return isOpenNextWeek;
      case 5:
        return isOpenSomeday;
      default:
        return false;
    }
  };

  const getSectionTasks = (sectionId: number): Task[] => {
    switch (sectionId) {
      case 1:
        return tasksPending;
      case 2:
        return tasksToday;
      case 3:
        return tasksTomorrow;
      case 4:
        return tasksNextWeek;
      case 5:
        return tasksSomeday;
      default:
        return [];
    }
  };

  const handleOpenSection = (sectionId: number) => {
    switch (sectionId) {
      case 1:
        setIsOpenPending(!isOpenPending);
        break;
      case 2:
        setIsOpenToday(!isOpenToday);
        break;
      case 3:
        setIsOpenTomorrow(!isOpenTomorrow);
        break;
      case 4:
        setIsOpenNextWeek(!isOpenNextWeek);
        break;
      case 5:
        setIsOpenSomeday(!isOpenSomeday);
        break;
      default:
        break;
    }
  };

  const renderItem = (item: Task, visibility: boolean) => {
    return (
      <TaskItemLimited
        taskItem={item}
        onPress={() => handleCheckTask(item)}
        visible={visibility}
      />
    );
  };

  return (
    <View style={styles.containerMain}>
      <Text style={styles.title}>Suas Tarefas</Text>
      <View style={styles.containerTasks}>
        <SectionList
          sections={[
            {
              id: 1,
              title: 'Pendentes',
              data: tasksPending,
            },
            {
              id: 2,
              title: 'Hoje',
              data: tasksToday,
            },
            {
              id: 3,
              title: 'Amanhã',
              data: tasksTomorrow,
            },
            {
              id: 4,
              title: 'Próximos 7 dias',
              data: tasksNextWeek,
            },
            {
              id: 5,
              title: 'Algum dia',
              data: tasksSomeday,
            },
          ]}
          renderItem={({item, section}) => {
            switch (section.id) {
              case 1:
                return renderItem(item, isOpenPending);
              case 2:
                return renderItem(item, isOpenToday);
              case 3:
                return renderItem(item, isOpenTomorrow);
              case 4:
                return renderItem(item, isOpenNextWeek);
              case 5:
                return renderItem(item, isOpenSomeday);
              default:
                return renderItem(item, true);
            }
          }}
          renderSectionHeader={({section}) => {
            const sectionIsOpen = getSectionIsOpen(section.id);
            const sectionTasks = getSectionTasks(section.id);

            return (
              <View style={styles.sectionTitle}>
                <Text style={styles.subTitle}>{section.title}</Text>
                <View style={styles.containerQuantityTasks}>
                  <Text style={[styles.subTitle, styles.quantityTasks]}>
                    {sectionTasks.length} Tarefas
                  </Text>
                  {sectionTasks.length > 0 &&
                    (sectionIsOpen ? (
                      <MaterialCommunityIcons
                        name={'arrow-up-drop-circle-outline'}
                        color="#4AC356"
                        size={24}
                        onPress={() => handleOpenSection(section.id)}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name={'arrow-down-drop-circle-outline'}
                        color="#4AC356"
                        size={24}
                        onPress={() => handleOpenSection(section.id)}
                      />
                    ))}
                </View>
              </View>
            );
          }}
          keyExtractor={item => `basicListEntry-${item.id}`}
          extraData={[
            isOpenPending,
            isOpenToday,
            isOpenTomorrow,
            isOpenNextWeek,
            isOpenSomeday,
            tasks,
          ]}
        />
      </View>
    </View>
  );
}
