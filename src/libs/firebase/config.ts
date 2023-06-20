// ** Firebase Imports
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB9IPgmTnXdw0HyBbbaMJlTB7W67QCV1uk',
  authDomain: 'tarefas2du.firebaseapp.com',
  databaseURL: 'https://tarefas2du-default-rtdb.firebaseio.com',
  projectId: 'tarefas2du',
  storageBucket: 'tarefas2du.appspot.com',
  messagingSenderId: '598611378190',
  appId: '1:598611378190:web:717975b789a9d47874bc5f',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

export {firebase, db, auth};
