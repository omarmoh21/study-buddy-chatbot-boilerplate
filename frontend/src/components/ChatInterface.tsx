import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Avatar,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Message } from '../types';

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // TODO: Make API call to /api/chat endpoint
      // You will need to:
      // 1. Use fetch or axios to POST to 'http://localhost:3001/api/chat'
      // 2. Send the user's message in the request body: { message: input }
      // 3. Handle the response from the backend
      // 4. Create a bot message with the response
      // 5. Add the bot message to the messages state

      // Placeholder: Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      const botMessage: Message = {
    id: (Date.now() + 1).toString(),
    text: data.reply || 'No response from server.',
    sender: 'bot',
    timestamp: new Date(),
    };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Error: Could not get response from server. Check your backend connection.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 200px)' }}>
      <Box sx={{ mb: 2 }}>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            background: 'linear-gradient(90deg,#1976d2,#60a5fa)',
            color: '#fff',
          }}
        >
          <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>SB</Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Study Buddy
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Your study assistant
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Paper
        elevation={3}
        sx={{
          flex: 1,
          overflow: 'auto',
          mb: 2,
          p: 2,
          background: 'linear-gradient(180deg,#f7fbff,#eef7ff)',
          '&::-webkit-scrollbar': {
            width: 10,
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#cfe8ff',
            borderRadius: 8,
          },
        }}
      >
        {messages.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body1" color="text.secondary">
              Start a conversation with Study Buddy!
            </Typography>
          </Box>
        ) : (
          <List>
            {messages.map((message) => (
              <ListItem
                key={message.id}
                sx={{
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: 1,
                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: message.sender === 'user' ? '#1565c0' : '#e0f2fe', color: message.sender === 'user' ? '#fff' : '#000' }}>
                    {message.sender === 'user' ? 'You' : 'Bot'}
                  </Avatar>

                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      borderRadius: 2,
                      background: message.sender === 'user' ? 'linear-gradient(90deg,#1565c0,#1976d2)' : '#fff',
                      color: message.sender === 'user' ? '#fff' : '#000',
                      boxShadow: message.sender === 'user' ? '0 6px 18px rgba(25,118,210,0.12)' : 'none',
                    }}
                  >
                    <ListItemText
                      primary={message.text}
                      secondary={message.timestamp.toLocaleTimeString()}
                      secondaryTypographyProps={{
                        color: message.sender === 'user' ? 'rgba(255,255,255,0.8)' : 'text.secondary',
                      }}
                    />
                  </Paper>
                </Box>
              </ListItem>
            ))}
            {loading && (
              <ListItem sx={{ justifyContent: 'flex-start' }}>
                <CircularProgress size={24} />
              </ListItem>
            )}
          </List>
        )}
      </Paper>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSend}
          disabled={loading || !input.trim()}
          sx={{ minWidth: 120 }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatInterface;

