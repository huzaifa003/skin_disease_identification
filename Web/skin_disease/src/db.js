// Import the functions you need from the Firebase SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbQJ6MzwDwIs4gjVY8QfEybbqydLyEM0k",
  authDomain: "lab-task-a428f.firebaseapp.com",
  databaseURL: "https://lab-task-a428f-default-rtdb.firebaseio.com",
  projectId: "lab-task-a428f",
  storageBucket: "lab-task-a428f.appspot.com",
  messagingSenderId: "540632382443",
  appId: "1:540632382443:web:41dc607e88cc390b5bb7ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

export { app, firestore };
