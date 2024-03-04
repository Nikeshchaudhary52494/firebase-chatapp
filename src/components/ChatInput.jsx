import { useState } from 'react';

function ChatInput({ onSubmit }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex mt-4">
      <input
        type="text"
        placeholder="Type here"
        className="flex-1 rounded-l-lg border border-gray-300 py-2 px-4 focus:outline-none focus:border-blue-500"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-lg focus:outline-none">
        Send
      </button>
    </form>
  );
}

export default ChatInput;
