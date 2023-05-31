import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.REACT_APP_FIREBASE_apiKey;
const authDomain = process.env.REACT_APP_FIREBASE_authDomain;
const databaseURL = process.env.REACT_APP_FIREBASE_databaseURL;
const projectId = process.env.REACT_APP_FIREBASE_projectId;
const storageBucket = process.env.REACT_APP_FIREBASE_storageBucket;
const messagingSenderId = process.env.REACT_APP_FIREBASE_messagingSenderId;
const appId = process.env.REACT_APP_FIREBASE_appId;

export {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};
