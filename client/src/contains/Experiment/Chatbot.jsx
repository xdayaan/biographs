import React, { useState } from 'react';
import { TextField, Button, Paper, IconButton, Collapse, Slide } from '@mui/material';
import { Close, Chat } from '@mui/icons-material';
import { styled } from '@mui/system';

const ChatWindow = styled(Paper)(({ theme }) => ({
  borderRadius: '10px',
  width: '350px',
  maxHeight: '500px',
  display: 'flex',
  flexDirection: 'column',
}));

const Chatbot = ({ tableData }) => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false); // For typing indicator

  const addMessageToChat = (sender, message) => {
    setChatMessages((prevMessages) => [...prevMessages, { sender, message }]);
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;

    // Add user message
    addMessageToChat('user', userInput);
    setIsBotTyping(true);

    try {
      const systemPrompt = `This is table data answer upcoming questions based on this data ${tableData}: Q- `;

      const response = await fetch("https://ai.potential.com/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system: systemPrompt,
          message: userInput,
          AI: "Ameen",
        }),
      });

      const data = await response.json();
      const botMessage = data.response;

      // Add bot message
      addMessageToChat("bot", botMessage);
    } catch (error) {
      console.error("Error:", error);
      addMessageToChat("bot", "Error communicating with the AI.");
    }

    setIsBotTyping(false);
    setUserInput(''); // Clear input field after sending
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <Slide direction="up" in={!isOpen} mountOnEnter unmountOnExit>
        <IconButton
          onClick={toggleChat}
          color="primary"
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '15px',
            boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          <Chat fontSize="large" />
        </IconButton>
      </Slide>

      <Collapse in={isOpen}>
        <ChatWindow>
          <div className="flex justify-between items-center p-2 bg-primary">
            <h2 className="text-lg font-semibold text-black">Chatbot</h2>
            <IconButton onClick={toggleChat}>
              <Close />
            </IconButton>
          </div>

          <Paper elevation={0} className="overflow-auto p-2" style={{ maxHeight: '350px' }}>
            <div className="chat-messages space-y-2">
              {chatMessages.map((msg, index) => (
                <Slide direction="right" in={true} key={index} timeout={500}>
                  <div
                    className={`chat-message ${msg.sender} mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                  >
                    <span
                      className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                      style={{
                        maxWidth: '70%',
                        wordBreak: 'break-word',
                      }}
                    >
                      {msg.message}
                    </span>
                  </div>
                </Slide>
              ))}
              {isBotTyping && (
                <div className="text-left">
                  <span className="inline-block p-2 rounded-lg bg-gray-300 text-black">
                    Typing...
                  </span>
                </div>
              )}
            </div>
          </Paper>

          <div className="flex p-2 border-t">
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              style={{ marginRight: '8px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSend}
            >
              Send
            </Button>
          </div>
        </ChatWindow>
      </Collapse>
    </div>
  );
};

export default Chatbot;
