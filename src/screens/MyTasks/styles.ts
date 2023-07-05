import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#537A57',
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
    color: '#4AC356',
  },
  containerTasks: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  list: {
    marginTop: 10,
  },
  task: {
    padding: 10,
    height: 70,
    marginTop: 5,
  },
  sectionTitle: {
    color: '#4AC356',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginTop: 40,
    marginBottom: 10,
    alignItems: 'center',
  },
  containerQuantityTasks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityTasks: {
    marginRight: 10,
  },
});
