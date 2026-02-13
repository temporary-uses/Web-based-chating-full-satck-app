import { useMemo } from 'react';

const formatTime = (isoTime) =>
  new Date(isoTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

function ChatWindow({ currentUser, messages }) {
  const sortedMessages = useMemo(
    () => [...messages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
    [messages]
  );

  return (
    <div className="chat-window">
      {sortedMessages.map((message) => {
        const mine = message.sender === currentUser;
        return (
          <div className={`bubble-row ${mine ? 'mine' : ''}`} key={`${message.id}-${message.createdAt}`}>
            <div className="bubble">
              <div className="meta">
                <strong>{message.sender}</strong>
                <span>{formatTime(message.createdAt)}</span>
              </div>
              <p>{message.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatWindow;
