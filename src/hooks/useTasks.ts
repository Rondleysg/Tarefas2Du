import {useContext} from 'react';
import TaskContext from '../context/Tasks';

export default function useTasks() {
  const {tasks, setTasks} = useContext(TaskContext);
  return {tasks, setTasks};
}
