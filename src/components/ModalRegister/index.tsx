// ** React Imports
import React, {useEffect, useRef, useState} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';

// ** Modal Imports
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';

// ** Styles Imports
import styles from './styles';

// ** Libs Imports
import DatePicker from 'react-native-date-picker';

// ** Utils Imports
import {getFullDateNormalized} from '../../utils/date';

// ** Icons Imports
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Hooks Imports
import useUser from '../../hooks/useUser';
import useTasks from '../../hooks/useTasks';

// ** Services Imports
import {TaskService} from '../../services/TaskService';

// ** Types Imports
import {Task} from '../../types/task';

function ModalRegister({sheetId}: SheetProps<{data: string}>) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [descriptionTask, setDescriptionTask] = useState('');
  const [dateTask, setDateTask] = useState<Date>(new Date());
  const [fullDateNormalized, setFullDateNormalized] = useState('');
  const [open, setOpen] = useState(false);
  const {user} = useUser();
  const {setTasks} = useTasks();

  useEffect(() => {
    setFullDateNormalized(getFullDateNormalized(dateTask));
  }, [dateTask]);

  function clearFields() {
    Keyboard.dismiss();
    setDescriptionTask('');
    setDateTask(new Date());
  }

  const onAddButtonPress = async () => {
    if (!user) {
      return;
    }
    if (descriptionTask && descriptionTask.length > 0) {
      try {
        const task: Task = {
          id: '',
          description: descriptionTask,
          userId: user.id,
          createdAt: new Date(),
          completed: false,
          completeDate: dateTask.getTime(),
          day: dateTask.getDate(),
          month: dateTask.getMonth(),
          year: dateTask.getFullYear(),
          hours: dateTask.getHours(),
          minutes: dateTask.getMinutes(),
        };
        const res = await TaskService.addTask(task);
        if (res) {
          clearFields();
          const taskData = {...task, id: res.id};
          setTasks(prevState => [...prevState, taskData]);
          actionSheetRef.current?.hide();
        }
      } catch (error: any) {
        Alert.alert(error);
      }
    }
  };

  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      containerStyle={styles.container}
      indicatorStyle={styles.indicator}
      gestureEnabled={true}>
      <View style={styles.content}>
        <TextInput
          style={styles.descInput}
          placeholder="Título da tarefa"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setDescriptionTask(text)}
          value={descriptionTask}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={styles.datePickerView}>
            <Text style={styles.datePickerInput}>{fullDateNormalized}</Text>
            <MaterialCommunityIcons
              name="calendar-plus"
              color="#a9a9a9"
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onAddButtonPress}>
            <MaterialCommunityIcons
              name="send-check"
              color="#a9a9a9"
              size={32}
              style={styles.btnConfirm}
            />
          </TouchableOpacity>
        </View>
        <DatePicker
          modal
          open={open}
          mode="datetime"
          date={dateTask}
          onConfirm={date => {
            setOpen(false);
            setDateTask(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          minimumDate={new Date()}
        />
      </View>
    </ActionSheet>
  );
}

export default ModalRegister;
