import React from 'react';
import {Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Task} from '../../types/task';
import {getHoursAndMinutesFormated} from '../../utils/date';

interface TaskItemLimitedProps {
  onPress: () => void;
  taskItem: Task;
}

export default function TaskItemLimited({
  onPress,
  taskItem,
}: TaskItemLimitedProps) {
  const window = useWindowDimensions();

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
          <Text>
            {getHoursAndMinutesFormated(taskItem.hours, taskItem.minutes)}
          </Text>
        </View>
      </View>
    </View>
  );
}
