import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
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
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    justifyContent: 'space-between',
  },
  descItem: {
    fontSize: 18,
    color: '#000000',
    width: '70%',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#a9a9a9',
  },
});
