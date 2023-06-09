export type Task = {
  id: string;
  userId: string;
  description: string;
  completed: boolean;
  completeDate: number;
  day: number;
  month: number;
  year: number;
  hours: number;
  minutes: number;
  createdAt: Date;
};

export type TaskHoursState =
  | 'taskHoursOk'
  | 'taskHoursAlert'
  | 'taskHoursProblem';
