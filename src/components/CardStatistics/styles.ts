import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  containerCard: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  containerTexts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: '#a9a9a9',
    textTransform: 'uppercase',
    marginLeft: 25,
    marginTop: 5,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#4AC356',
    textTransform: 'uppercase',
    marginHorizontal: 25,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  line: {
    marginBottom: 5,
    marginTop: 5,
  },
});
