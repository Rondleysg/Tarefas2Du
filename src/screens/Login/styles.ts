import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 15,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5DB075',
    alignSelf: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: 200,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#4BCD57',
  },
  logo2: {
    height: 50,
    top: -1,
  },
  textDesc: {
    textAlign: 'center',
    marginTop: 22,
  },
  input: {
    height: 48,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 25,
    marginBottom: 10,
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
    justifyContent: 'center',
    marginHorizontal: 48,
    marginLeft: 90,
    alignItems: 'baseline',
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
