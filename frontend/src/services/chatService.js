import axios from 'axios';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const fetchMessages = async () => {
  const { data } = await axios.get(`${API_URL}/api/messages`);
  return data;
};

export const createChatClient = ({ onMessage }) => {
  const client = new Client({
    webSocketFactory: () => new SockJS(`${API_URL}/ws`),
    reconnectDelay: 5000,
    onConnect: () => {
      client.subscribe('/topic/public', (message) => {
        onMessage(JSON.parse(message.body));
      });
    }
  });

  client.activate();
  return client;
};

export const sendMessage = (client, payload) => {
  if (!client || !client.connected) {
    return;
  }

  client.publish({
    destination: '/app/chat.send',
    body: JSON.stringify(payload)
  });
};
