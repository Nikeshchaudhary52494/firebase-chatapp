// MessageList.js
import { useState } from 'react';

function MessageList({ messages, onDelete, onEdit }) {
  const [editText, setEditText] = useState("");
  const [editMode, setEditMode] = useState(null);

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleEdit = (id, text) => {
    setEditMode(id);
    setEditText(text);
  };

  const handleSaveEdit = (id) => {
    onEdit(id, editText);
    setEditMode(null);
    setEditText("");
  };

  return (
    <ul className="message-list">
      {messages.slice().reverse().map((message) => (
        <li key={message.id} className="message bg-gray-100 p-2 my-2 rounded-lg relative">
          <span className="text-gray-500 text-xs absolute top-0 right-0">{message.timestamp}</span>
          {editMode === message.id ? (
            <div>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="block w-full h-20 p-2 mb-2 rounded-md border border-gray-300"
              ></textarea>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={() => handleSaveEdit(message.id)}
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-800">{message.text}</p>
              <div>
                <button
                  className="text-red-500 mr-2"
                  onClick={() => handleDelete(message.id)}
                >
                  Delete
                </button>
                <button
                  className="text-blue-500"
                  onClick={() => handleEdit(message.id, message.text)}
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default MessageList;
