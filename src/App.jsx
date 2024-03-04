import { useState, useEffect } from 'react';
import './App.css';
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

function App() {
  const [value, setValue] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure value is not empty before writing to the database
    if (value.trim() !== "") {
      push(ref(db, 'messages'), {
        text: value,
        timestamp: new Date().toLocaleString() // Add timestamp to the message
      });
      setValue(""); // Reset input value after submission
    }
  }

  return (
    <div className="App">
      <h1>Chat App</h1>
      <div className="chat-container">
        <ul className="message-list">
          {messages.map((message) => (
            <li key={message.id} className="message">
              <span className="timestamp">{message.timestamp}</span>
              {message.text}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit} className="message-form">
          <input
            type="text"
            placeholder='Type here'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
