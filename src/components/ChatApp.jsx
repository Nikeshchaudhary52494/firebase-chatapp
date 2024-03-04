// ChatApp.js
import { useState, useEffect } from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import { getDatabase, ref, push, onValue } from "firebase/database";
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
const db = getDatabase(firebaseApp); // Get the database instance

function ChatApp() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const dbRef = ref(db, 'messages');
        // Attach an asynchronous callback to read the data
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messagesArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setMessages(messagesArray.reverse()); // Reverse the array to display latest messages at the bottom
            } else {
                setMessages([]);
            }
        });
    }, [db]);

    const handleMessageSubmit = (message) => {
        if (message.trim() !== "") {
            push(ref(db, 'messages'), {
                text: message,
                timestamp: new Date().toLocaleString() // Add timestamp to the message
            });
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Chat App</h1>
            <MessageList messages={messages} />
            <ChatInput onSubmit={handleMessageSubmit} />
        </div>
    );
}

export default ChatApp;
