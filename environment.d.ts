declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      REACT_APP_FIREBASE_apiKe: string;
      REACT_APP_FIREBASE_authDomain: string;
      REACT_APP_FIREBASE_databaseURL: string;
      REACT_APP_FIREBASE_projectId: string;
      REACT_APP_FIREBASE_storageBucket: string;
      REACT_APP_FIREBASE_messagingSenderId: string;
      REACT_APP_FIREBASE_appId: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
