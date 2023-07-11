// ** React Imports
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';

// ** Styles Imports
import styles from './styles';

// ** Icons Imports
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Types Imports
import {Task, TaskHoursState} from '../../types/task';

// ** Utils Imports
import {getHoursAndMinutesFormated, getHoursState} from '../../utils/date';

// ** Services Imports
import {TaskService} from '../../services/TaskService';

// ** Hooks Imports
import useTasks from '../../hooks/useTasks';

// ** Lib Imports
import notifee, {
  AndroidImportance,
  EventType,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

interface TaskItemProps {
  taskItem: Task;
}

export default function TaskItem({taskItem}: TaskItemProps) {
  const [hoursState, setHoursState] = useState<TaskHoursState>(
    getHoursState(taskItem),
  );
  const {tasks, setTasks} = useTasks();

  const window = useWindowDimensions();

  const handleCheckTask = async (task: Task) => {
    TaskService.markTaskAsCompleted(task);
    const tasksAux = tasks.map(taskAux => {
      let copyTaskAux = {...taskAux};
      if (copyTaskAux.id === task.id) {
        copyTaskAux.completed = !copyTaskAux.completed;
      }
      return copyTaskAux;
    });
    setTasks(tasksAux);
  };

  notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;
    if (!notification || !pressAction || !notification.data) {
      return;
    }
    const taskNotification = notification.data.taskNotification as Task;

    if (type === EventType.ACTION_PRESS && pressAction.id === 'complete_task') {
      handleCheckTask(taskNotification);
    }

    await notifee.cancelNotification(notification.id!);
  });

  useEffect(() => {
    return notifee.onForegroundEvent(async ({type, detail}) => {
      const {notification, pressAction} = detail;
      if (!notification || !pressAction || !notification.data) {
        return;
      }
      const taskNotification = notification.data.taskNotification as Task;

      if (taskNotification.id !== taskItem.id) {
        return;
      }

      if (
        type === EventType.ACTION_PRESS &&
        pressAction.id === 'complete_task'
      ) {
        handleCheckTask(taskNotification);
      }

      await notifee.cancelNotification(notification.id!);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHoursState(getHoursState(taskItem));
    }, 1000 * 60 * 60);
    return () => clearInterval(intervalId);
  }, [taskItem]);

  useEffect(() => {
    async function handleSendNotification() {
      const date = new Date();
      date.setHours(taskItem.hours);
      date.setMinutes(taskItem.minutes);
      const now = new Date();

      if (date < now) {
        return;
      }

      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(),
      };

      await notifee.requestPermission();
      const channelId = await notifee.createChannel({
        id: `send-task-notification-${taskItem.id}`,
        name: 'Lembrete de tarefa',
        importance: AndroidImportance.HIGH,
      });

      await notifee.createTriggerNotification(
        {
          title: `<strong>${taskItem.description}</strong>`,
          body: 'Lembrete para realizar a tarefa!',
          data: {
            taskNotification: taskItem,
          },
          android: {
            channelId,
            smallIcon: 'ic_small_icon',
            loopSound: true,
            color: '#4BCD57',
            pressAction: {
              id: `send-task-notification-${taskItem.id}`,
            },
            actions: [
              {
                title: 'Adiar',
                pressAction: {
                  id: 'delay_task',
                },
              },
              {
                title: 'Concluir',
                pressAction: {
                  id: 'complete_task',
                },
              },
            ],
          },
        },
        trigger,
      );
    }

    const date = new Date();
    date.setHours(taskItem.hours);
    date.setMinutes(taskItem.minutes);
    const now = new Date();

    if (date < now || taskItem.completed) {
      return;
    } else {
      handleSendNotification();
    }
  }, [taskItem]);

  return (
    <View style={[styles.container, {width: window.width}]}>
      <View style={styles.containerTask}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleCheckTask(taskItem)}
          style={styles.buttonCheckItem}>
          <MaterialCommunityIcons
            name={
              taskItem.completed
                ? 'checkbox-marked-circle'
                : 'checkbox-blank-circle-outline'
            }
            color="#a9a9a9"
            size={24}
          />
        </TouchableOpacity>
        <View style={styles.containerText}>
          <Text
            style={[
              styles.descItem,
              taskItem.completed ? styles.completedTask : {},
            ]}>
            {taskItem.description}
          </Text>
          <Text
            style={[
              styles.hoursItem,
              styles[hoursState],
              taskItem.completed ? styles.completedTask : {},
            ]}>
            {getHoursAndMinutesFormated(taskItem.hours, taskItem.minutes)}
          </Text>
        </View>
      </View>
    </View>
  );
}
