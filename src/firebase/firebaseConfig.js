import { getDatabase, ref, push, onValue, update, remove } from "firebase/database";
import { initializeApp } from "firebase/app";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "https://chat-app-ee5ca-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-app-ee5ca",
    storageBucket: "chat-app-ee5ca.appspot.com",
    messagingSenderId: "57019470901",
    appId: "1:57019470901:web:73aa81a89bdf2455400d7c"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase(firebaseApp); 