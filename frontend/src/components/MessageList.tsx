import { Box, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <List>
      {messages.map((message, index) => (
        <ListItem key={index}>
          <Box
            display="flex"
            width="100%"
            justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
          >
            <ListItemText
              primary={message.text}
              secondary={message.sender === 'user' ? 'Você' : 'ChatGPT'}
            />
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default MessageList;
