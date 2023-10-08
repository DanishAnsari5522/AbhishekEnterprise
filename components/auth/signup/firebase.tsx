// import firebase from 'firebase/compat/app'
// import 'firebase/compat/auth'
// import 'firebase/compat/firestore'
// import {initializeApp} from "firebase/app";
// import {getAuth} from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCUFJmuqPiPv__PGnvUkt-0BK5EugNLAfs",
//   authDomain: "keycards-79264.firebaseapp.com",
//   projectId: "keycards-79264",
//   storageBucket: "keycards-79264.appspot.com",
//   messagingSenderId: "936224581580",
//   appId: "1:936224581580:web:a44f77800008b117ab5f69",
//   measurementId: "G-P19WC3NRW1"
// };


// const app=initializeApp(firebaseConfig)

// // if (!firebase.apps.length) {
// //   firebase.initializeApp(firebaseConfig)
// // }

// export const auth=getAuth(app);




import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  // Your Firebase configuration goes here
  apiKey: "AIzaSyCUFJmuqPiPv__PGnvUkt-0BK5EugNLAfs",
  authDomain: "keycards-79264.firebaseapp.com",
  projectId: "keycards-79264",
  storageBucket: "keycards-79264.appspot.com",
  messagingSenderId: "936224581580",
  appId: "1:936224581580:web:a44f77800008b117ab5f69",
  measurementId: "G-P19WC3NRW1"
};

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

export default firebase;