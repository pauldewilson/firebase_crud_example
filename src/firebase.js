// system imports
import firebase from "firebase";

const firebaseConfig = {
  // firebase config where potentially sensitive info is held in env.local
  apiKey: process.env.FIREBASE_API,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL:
    "https://todoistclone-6ef44-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
};

const fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
