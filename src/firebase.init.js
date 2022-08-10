// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEIFYE0mTcNfAa43_dzD1rX77X_wYgLmo",
  authDomain: "todo-b3c01.firebaseapp.com",
  projectId: "todo-b3c01",
  storageBucket: "todo-b3c01.appspot.com",
  messagingSenderId: "1056624350889",
  appId: "1:1056624350889:web:f4474a3b0178979111fbb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;