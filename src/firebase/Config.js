
import firebase from 'firebase/compat/app';
import  'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDbCGwAcOlC-UaOEX6RZcIqegsrTc2RpKw",
  authDomain: "socialchat-80e47.firebaseapp.com",
  projectId: "socialchat-80e47",
  storageBucket: "socialchat-80e47.appspot.com",
  messagingSenderId: "344567463606",
  appId: "1:344567463606:web:d08eb13362006cc7a0b017"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };

