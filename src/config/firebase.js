import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCjziOk7lRDK6oIRK15Qgt80jk0Y5erqrs",
  authDomain: "todo-b2420.firebaseapp.com",
  databaseURL: "https://todo-b2420-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-b2420",
  storageBucket: "todo-b2420.firebasestorage.app",
  messagingSenderId: "724851164997",
  appId: "1:724851164997:web:5df3b8aa5c861e8c93202c",
  measurementId: "G-7Q05HWR6EP"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);