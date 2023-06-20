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

interface TaskItemProps {
  onPress: () => void;
  taskItem: Task;
}

export default function TaskItem({onPress, taskItem}: TaskItemProps) {
  const [hoursState, setHoursState] = useState<TaskHoursState>(
    getHoursState(taskItem),
  );

  const window = useWindowDimensions();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHoursState(getHoursState(taskItem));
    }, 1000 * 60 * 60);

    return () => clearInterval(intervalId);
  }, [taskItem]);

  return (
    <View style={[styles.container, {width: window.width}]}>
      <View style={styles.containerTask}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onPress()}
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
