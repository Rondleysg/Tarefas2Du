// ** Types Imports
import {Task, TaskHoursState} from '../types/task';

export const getCurrentDate = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  return date + '/' + month + '/' + year + '-' + hours + ':' + minutes; // *format: dd/mm/yy-hh:mm;
};

export const getHoursAndMinutesFormated = (hours: number, minutes: number) => {
  return (
    hours.toString().padStart(2, '0') +
    ':' +
    minutes.toString().padStart(2, '0')
  ); // *format: hh:mm;
};

export const getCurrentDay = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  return date + '/' + month + '/' + year; // *format: dd/mm/yy;
};

export const getCurrentDayText = () => {
  const monName = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'Maio',
    'junho',
    'agosto',
    'outubro',
    'novembro',
    'dezembro',
  ];

  const date = new Date().getDate();
  const month = new Date().getMonth();

  return date + ' de ' + monName[month]; // *format: dd de mês
};

export const getHoursState = (task: Task): TaskHoursState => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  if (task.hours < hours || (task.hours === hours && task.minutes < minutes)) {
    return 'taskHoursProblem';
  }
  if (task.hours <= hours + 1) {
    return 'taskHoursAlert';
  }
  return 'taskHoursOk';
};

export const getFullDateNormalized = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return date.toLocaleDateString() + ' ' + hours + ':' + minutes; // *format: dd/mm/yy hh:mm;
};

export const isNextWeek = (date: Date): boolean => {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const nextWeekStart = new Date(
    nextWeek.getFullYear(),
    nextWeek.getMonth(),
    nextWeek.getDate() - (nextWeek.getDay() + 1),
  );
  const nextWeekEnd = new Date(
    nextWeekStart.getFullYear(),
    nextWeekStart.getMonth(),
    nextWeekStart.getDate() + 7,
  );

  return date >= nextWeekStart && date <= nextWeekEnd;
};
