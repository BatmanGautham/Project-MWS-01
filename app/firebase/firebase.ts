import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_CONFIG } from '../config/env';

// Initialize Firebase only once
const app = initializeApp(FIREBASE_CONFIG);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const database = getDatabase(app);
const storage = getStorage(app);

export { app, auth, database, storage };

// Add default export to fix warning
export default { app, auth, database, storage };
