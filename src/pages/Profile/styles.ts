import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: 'center',
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
  containerInfos: {
    marginTop: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerImage: {
    flexDirection: 'column',
    marginLeft: 25,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    borderColor: '#4BCD57',
    borderWidth: 2,
    borderRadius: 40,
  },
  btnText: {
    color: '#a9a9a9',
    fontSize: 14,
    alignSelf: 'center',
  },
  containerFields: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    marginRight: 20,
    marginTop: 10,
  },
  flexField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 40,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a9a9a9',
  },
  email: {
    fontSize: 16,
    color: '#a9a9a9',
  },
});
