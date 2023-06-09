import React from 'react';
import {Task} from '../../types/task';

type TaskContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const iTaskContextState = {
  tasks: [],
  setTasks: () => {},
};

const TaskContext = React.createContext<TaskContextType>(iTaskContextState);

export default TaskContext;
