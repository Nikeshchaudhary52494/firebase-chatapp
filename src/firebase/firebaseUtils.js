import { ref, push, onValue, update, remove } from "firebase/database";
import { db } from "./firebaseConfig";



export const readMessages = (setMessages) => {
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
}

export const createMessage = (message) => {
    push(ref(db, 'messages'), {
        text: message,
        timestamp: new Date().toLocaleString() // Add timestamp to the message
    });
}

export const deleteMessage = (id) => {
    remove(ref(db, `messages/${id}`));
}
export const updateMessage = (id, newText) => {
    update(ref(db, `messages/${id}`), { text: newText });
}