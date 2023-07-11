// ** Firebase Imports
import {db} from '../libs/firebase/config';

// ** Types Imports
import {Task} from '../types/task';

// ** Utils Imports
import {isNextWeek, isPast} from '../utils/date';

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

  getTasksToday(tasks: Task[]): Task[] {
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

  getTasksTomorrow(tasks: Task[]): Task[] {
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

  getTasksNextWeek(tasks: Task[]): Task[] {
    const tasksNextWeekAux = tasks.filter(task => {
      if (isNextWeek(new Date(task.completeDate))) {
        return task;
      }
    });
    return tasksNextWeekAux;
  },

  getTasksSomeday(tasks: Task[]): Task[] {
    const tasksSomedayAux = tasks.filter(
      task =>
        task.month >= dateToday.getMonth() + 1 &&
        task.year >= dateToday.getFullYear(),
    );
    return tasksSomedayAux;
  },

  getTasksPending(tasks: Task[]): Task[] {
    const tasksPendingAux = tasks.filter(task => {
      const dateTask = new Date(task.completeDate);
      if (task.completed === false && isPast(dateTask)) {
        return task;
      }
    });
    return tasksPendingAux;
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
