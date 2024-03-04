import { useState, useEffect } from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import { createMessage, deleteMessage, readMessages, updateMessage } from '../firebase/firebaseUtils';
// Get the database instance
function ChatApp() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        readMessages(setMessages)
    }, [readMessages]);

    const handleMessageSubmit = (message) => {
        if (message.trim() !== "") {
            createMessage(message);
        }
    }

    const handleDelete = (id) => {
        deleteMessage(id);
    };

    const handleEdit = (id, newText) => {
        updateMessage(id, newText);
    };

    return (
        <div className='min-h-screen bg-cyan-950 p-10  w-full'>
            <h1 className='text-center text-white text-3xl font-bold mb-5'>Chat Application</h1>
            <div className='max-w-5xl mx-auto flex flex-col h-full pb-10'>
                <div className='overflow-y-scroll px-5 bg-cyan-900 rounded-md py-10'>
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
