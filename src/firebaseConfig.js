import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyClOuLHyZmEQQVpUngnSDsWj8l9oR5BrjA",
    authDomain: "chat-app-ee5ca.firebaseapp.com",
    databaseURL: "https://chat-app-ee5ca-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-app-ee5ca",
    storageBucket: "chat-app-ee5ca.appspot.com",
    messagingSenderId: "57019470901",
    appId: "1:57019470901:web:73aa81a89bdf2455400d7c"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
