import { useEffect, useMemo, useState } from 'react';
import ChatWindow from './components/ChatWindow';
import { createChatClient, fetchMessages, sendMessage } from './services/chatService';

function App() {
  const [username, setUsername] = useState('');
  const [draftUser, setDraftUser] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    fetchMessages()
      .then((initial) => setMessages(initial))
      .catch(() => setMessages([]));

    const chatClient = createChatClient({
      onMessage: (incoming) => {
        setMessages((prev) => [...prev, incoming]);
      }
    });

    setClient(chatClient);

    return () => {
      chatClient.deactivate();
    };
  }, []);

  const canSend = useMemo(
    () => username.trim() && message.trim() && client?.connected,
    [username, message, client]
  );

  const handleJoin = (e) => {
    e.preventDefault();
    if (!draftUser.trim()) return;
    setUsername(draftUser.trim());
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!canSend) return;
    sendMessage(client, { sender: username, content: message });
    setMessage('');
  };

  return (
    <main className="app">
      <header>
        <h1>Realtime Chat</h1>
      </header>

      {!username ? (
        <form className="card" onSubmit={handleJoin}>
          <label htmlFor="username">Enter your name</label>
          <input
            id="username"
            value={draftUser}
            onChange={(e) => setDraftUser(e.target.value)}
            placeholder="e.g. Alex"
          />
          <button type="submit">Join chat</button>
        </form>
      ) : (
        <>
          <p className="status">Logged in as <strong>{username}</strong></p>
          <ChatWindow currentUser={username} messages={messages} />
          <form className="composer" onSubmit={handleSend}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button type="submit" disabled={!canSend}>Send</button>
          </form>
        </>
      )}
    </main>
  );
}

export default App;
