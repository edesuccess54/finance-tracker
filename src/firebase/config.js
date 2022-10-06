import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCyNMStG45vYgKVcz1jOYDNt6UmFdm7uKY",
    authDomain: "finance-tracker-52581.firebaseapp.com",
    projectId: "finance-tracker-52581",
    storageBucket: "finance-tracker-52581.appspot.com",
    messagingSenderId: "741390777960",
    appId: "1:741390777960:web:06ab300a281f072c7d85dd"
  };

//   init firebase
firebase.initializeApp(firebaseConfig);

// init services 
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }