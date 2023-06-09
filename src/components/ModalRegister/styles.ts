import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  indicator: {
    width: 100,
  },
  content: {
    padding: 20,
    flexDirection: 'column',
    width: '100%',
    minHeight: 150,
  },
  descInput: {
    height: 48,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 16,
    borderColor: '#A6A6A6',
    borderWidth: 1,
  },
  datePickerView: {
    height: 48,
    width: '70%',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderColor: '#A6A6A6',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  datePickerInput: {
    fontSize: 16,
  },
  btnConfirm: {
    backgroundColor: '#4AC356',
    color: '#FFF',
    width: 70,
    borderRadius: 10,
    paddingLeft: 20,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
