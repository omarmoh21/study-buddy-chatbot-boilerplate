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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 0 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            borderRadius: 0,
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.2)',
          }}
        >
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: 'rgba(255,255,255,0.25)',
              fontSize: '1.5rem',
              fontWeight: 700,
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
          >
            SB
          </Avatar>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.5px',
              }}
            >
              Study Buddy
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                opacity: 0.9,
                fontWeight: 400,
              }}
            >
              Your intelligent study companion
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Messages Container */}
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          overflow: 'auto',
          m: 2,
          p: 3,
          background: 'linear-gradient(180deg, #ffffff 0%, #f8f9ff 100%)',
          borderRadius: 3,
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
          '&::-webkit-scrollbar': {
            width: 12,
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(180deg, #667eea, #764ba2)',
            borderRadius: 12,
            border: '3px solid transparent',
            backgroundClip: 'padding-box',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'linear-gradient(180deg, #5568d3, #6b3a8f)',
            backgroundClip: 'padding-box',
          },
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              mt: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontSize: '2.5rem',
              }}
            >
              💬
            </Avatar>
            <Typography
              variant="h6"
              sx={{
                color: '#667eea',
                fontWeight: 600,
                letterSpacing: '0.3px',
              }}
            >
              Start a conversation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ask Study Buddy anything about your studies!
            </Typography>
          </Box>
        ) : (
          <List>
            {messages.map((message) => (
              <ListItem
                key={message.id}
                sx={{
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                  animation: 'slideIn 0.3s ease-out',
                  '@keyframes slideIn': {
                    from: {
                      opacity: 0,
                      transform: 'translateY(10px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: 1.5,
                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      background:
                        message.sender === 'user'
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      color: '#fff',
                      boxShadow: message.sender === 'user' ? '0 4px 12px rgba(102, 126, 234, 0.3)' : '0 4px 12px rgba(245, 87, 108, 0.3)',
                    }}
                  >
                    {message.sender === 'user' ? '👤' : '🤖'}
                  </Avatar>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      maxWidth: '75%',
                      borderRadius: 2.5,
                      background:
                        message.sender === 'user'
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : '#fff',
                      color: message.sender === 'user' ? '#fff' : '#1a1a1a',
                      boxShadow:
                        message.sender === 'user'
                          ? '0 8px 24px rgba(102, 126, 234, 0.15)'
                          : '0 4px 12px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        boxShadow:
                          message.sender === 'user'
                            ? '0 12px 32px rgba(102, 126, 234, 0.2)'
                            : '0 6px 16px rgba(0, 0, 0, 0.12)',
                      },
                    }}
                  >
                    <ListItemText
                      primary={message.text}
                      secondary={message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      primaryTypographyProps={{
                        sx: {
                          fontWeight: 500,
                          lineHeight: 1.5,
                          letterSpacing: '0.3px',
                        },
                      }}
                      secondaryTypographyProps={{
                        color:
                          message.sender === 'user'
                            ? 'rgba(255,255,255,0.7)'
                            : 'text.secondary',
                        sx: { fontSize: '0.75rem', mt: 0.5 },
                      }}
                    />
                  </Paper>
                </Box>
              </ListItem>
            ))}
            {loading && (
              <ListItem sx={{ justifyContent: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5 }}>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    }}
                  >
                    🤖
                  </Avatar>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2.5,
                      background: '#fff',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <CircularProgress size={24} sx={{ color: '#667eea' }} />
                  </Box>
                </Box>
              </ListItem>
            )}
          </List>
        )}
      </Paper>
      {/* Input Area */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          gap: 1.5,
          background: '#fff',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          multiline
          maxRows={3}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              transition: 'all 0.3s ease',
              background: '#f8f9ff',
              '&:hover': {
                background: '#f0f2ff',
              },
              '&.Mui-focused': {
                background: '#fff',
                boxShadow: '0 0 0 2px rgba(102, 126, 234, 0.1)',
              },
            },
            '& .MuiOutlinedInput-input::placeholder': {
              color: '#b0b9d4',
              opacity: 1,
            },
          }}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSend}
          disabled={loading || !input.trim()}
          sx={{
            minWidth: 120,
            borderRadius: 3,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover:not(:disabled)': {
              boxShadow: '0 12px 28px rgba(102, 126, 234, 0.4)',
              transform: 'translateY(-2px)',
            },
            '&:active:not(:disabled)': {
              transform: 'translateY(0)',
            },
            '&:disabled': {
              background: '#d0d5e8',
              color: '#999',
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatInterface;

