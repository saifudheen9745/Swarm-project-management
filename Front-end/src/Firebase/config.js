
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAytzUJej-AHX6C0UG875O30G697gWbe18",
  authDomain: "swarm-615d0.firebaseapp.com",
  projectId: "swarm-615d0",
  storageBucket: "swarm-615d0.appspot.com",
  messagingSenderId: "3074624752",
  appId: "1:3074624752:web:fe1cdeca07024779664635",
  measurementId: "G-3E3XFEGKZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth,provider};
export default app;