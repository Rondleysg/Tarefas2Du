import {useContext} from 'react';
import TaskContext from '../context/Tasks';

export default function useUser() {
  const {tasks, setTasks} = useContext(TaskContext);
  return {tasks, setTasks};
}
