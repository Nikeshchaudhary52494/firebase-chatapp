// MessageList.js
function MessageList({ messages }) {
    return (
      <ul className="message-list">
        {messages.map((message) => (
          <li key={message.id} className="message bg-gray-100 p-2 my-2 rounded-lg">
            <span className="text-gray-500 text-xs">{message.timestamp}</span>
            <p className="text-gray-800">{message.text}</p>
          </li>
        ))}
      </ul>
    );
  }
  
  export default MessageList;
  