import { Box, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get<Message[]>(`${process.env.REACT_APP_API_URL}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async (message: string) => {
    const newMessage: Message = { sender: 'user', text: message };
    setMessages([...messages, newMessage]);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/messages`, newMessage);
      // Simular resposta do ChatGPT
      const botResponse: Message = { sender: 'bot', text: 'Resposta do ChatGPT' };
      setMessages(prevMessages => [...prevMessages, botResponse]);
      await axios.post(`${process.env.REACT_APP_API_URL}/messages`, botResponse);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Box flexGrow={1} overflow="auto" mb={2}>
        <MessageList messages={messages} />
      </Box>
      <MessageInput onSendMessage={handleSendMessage} />
    </Paper>
  );
};

export default ChatPanel;
