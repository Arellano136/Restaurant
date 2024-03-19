import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRc_ViHvfnGfviC8Y-6GibAFeucqXECKQ",
  authDomain: "bd-movil-7bdf0.firebaseapp.com",
  projectId: "bd-movil-7bdf0",
  storageBucket: "bd-movil-7bdf0.appspot.com",
  messagingSenderId: "353078499380",
  appId: "1:353078499380:web:0b513a0e4a4d55b6109261"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);
const storage =  getStorage(app);
export {app,auth,db,storage};