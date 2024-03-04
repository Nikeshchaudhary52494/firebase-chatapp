import { useState, useEffect } from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
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

    const handleDelete = (id) => {
        remove(ref(db, `messages/${id}`));
    };

    const handleEdit = (id, newText) => {
        update(ref(db, `messages/${id}`), { text: newText });
    };

    return (
        <div className='h-screen bg-cyan-950 p-10 fixed w-full'>
            <h1 className='text-center text-white text-3xl font-bold mb-5'>Chat Application</h1>
            <div className='max-w-5xl mx-auto flex flex-col justify-between h-full pb-10'>
                <div className='overflow-y-scroll px-5 bg-cyan-900 py-10'>
                    <MessageList messages={messages} onDelete={handleDelete} onEdit={handleEdit} />
                </div>
                <div>
                    <ChatInput onSubmit={handleMessageSubmit} />
                </div>
            </div>
        </div>
    );
}

export default ChatApp;
