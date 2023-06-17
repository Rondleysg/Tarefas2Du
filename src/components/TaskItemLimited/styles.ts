import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTask: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonCheckItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
  },
  containerText: {
    marginLeft: 30,
    flexDirection: 'column',
  },
  descItem: {
    fontSize: 18,
    color: '#000000',
  },
  hoursItem: {
    fontSize: 14,
  },
  taskHoursOk: {
    color: '#4AC356',
  },
  taskHoursAlert: {
    color: '#FFC107',
  },
  taskHoursProblem: {
    color: '#FF0000',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#a9a9a9',
  },
});
