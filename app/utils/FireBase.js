import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCGG9lJzv4kBxHUPB-ub6l5GntolWR6bcE",
  authDomain: "tenedores-38179.firebaseapp.com",
  databaseURL: "https://tenedores-38179.firebaseio.com",
  projectId: "tenedores-38179",
  storageBucket: "tenedores-38179.appspot.com",
  messagingSenderId: "364992675784",
  appId: "1:364992675784:web:40c5d099412f3a1c1b8afd"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
