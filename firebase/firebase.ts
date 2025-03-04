import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZa-4_hE28MzOYp3STMZlIdVU4IXVJbOw",
  authDomain: "rylang-c9742.firebaseapp.com",
  databaseURL: "https://rylang-c9742-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rylang-c9742",
  storageBucket: "rylang-c9742.firebasestorage.app",
  messagingSenderId: "106165605904",
  appId: "1:106165605904:web:82494dd7947fa3dbc99c95",
  measurementId: "G-YW6HDE23G1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  // Simplified auth initialization
export const database = getDatabase(app);
export { app };
