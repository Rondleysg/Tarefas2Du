// ** Firebase Imports
import {db} from '../libs/firebase/config';

// ** Types Imports
import {Task} from '../types/task';

// ** Utils Imports
import {getWeekNumber} from '../utils/date';

const dateToday = new Date();
const tasksRef = db.collection('tasks');

export const TaskService = {
  async getTasksByUserId(userId: string): Promise<Task[]> {
    const doc = await tasksRef
      .where('userId', '==', userId)
      .orderBy('completeDate', 'desc')
      .get();
    const tasks: Task[] = [];
    doc.forEach(task => {
      const taskData = task.data() as Task;
      taskData.id = task.id;
      tasks.push(taskData);
    });
    return tasks;
  },

  async markTaskAsCompleted(task: Task) {
    tasksRef.doc(task.id).update({
      completed: !task.completed,
    });
  },

  async getTasksToday(tasks: Task[]): Promise<Task[]> {
    const tasksTodayAux = tasks.filter(task => {
      const date = new Date();
      return (
        task.day === date.getDate() &&
        task.month === date.getMonth() &&
        task.year === date.getFullYear()
      );
    });
    return tasksTodayAux;
  },

  async getTasksTomorrow(tasks: Task[]): Promise<Task[]> {
    const tasksTomorrowAux = tasks.filter(task => {
      const date = new Date();
      return (
        task.day === date.getDate() + 1 &&
        task.month === date.getMonth() &&
        task.year === date.getFullYear()
      );
    });
    return tasksTomorrowAux;
  },

  async getTasksNextWeek(tasks: Task[]): Promise<Task[]> {
    const currentWeek = getWeekNumber(dateToday);
    const tasksNextWeekAux = tasks.filter(task => {
      const taskWeek = getWeekNumber(new Date(task.completeDate * 1000));
      if (taskWeek === currentWeek + 1) {
        return task;
      }
    });
    return tasksNextWeekAux;
  },

  async getTasksSomeday(tasks: Task[]): Promise<Task[]> {
    const tasksSomedayAux = tasks.filter(
      task =>
        task.month >= dateToday.getMonth() + 1 &&
        task.year >= dateToday.getFullYear(),
    );
    return tasksSomedayAux;
  },

  async addTask(task: Task) {
    try {
      const res = await tasksRef.add(task);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};
