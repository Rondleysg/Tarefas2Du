import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {},
  logo: {
    height: 250,
    width: '100%',
    alignSelf: 'center',
  },
  logo2: {
    height: 100,
    top: -1,
  },
  textDesc: {
    textAlign: 'center',
    marginTop: 22,
    marginBottom: 12,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 16,
    borderColor: 'black',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#5DB075',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    width: '50%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 48,
    marginLeft: 90,
    marginBottom: 30,
  },
  signupText: {
    color: '#979797',
    fontWeight: 'bold',
    fontSize: 16,
    width: '50%',
  },
  keyboard: {
    flex: 1,
    width: '100%',
  },
  formContainer: {
    marginHorizontal: 48,
    marginTop: 20,
  },
});
