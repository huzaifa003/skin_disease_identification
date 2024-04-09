import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { firestore } from './db';
import { Box, TextField, Button, List, Typography, Paper } from '@mui/material';

const Chat = ({ userId, role }) => {
  const [chatData, setChatData] = useState({ messages: [] }); // Ensure initial state includes messages array
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const uniqueDocument = `document_${userId}`;
    const docRef = doc(firestore, 'chats', uniqueDocument);

    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setChatData(docSnapshot.data());
      } else {
        console.log("No such document!");
      }
    }, (err) => {
      console.error(`Encountered error: ${err}`);
    });

    return () => unsubscribe();
  }, [userId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const uniqueDocument = `document_${userId}`;
    const docRef = doc(firestore, 'chats', uniqueDocument);

    try {
      await updateDoc(docRef, {
        messages: arrayUnion({
          text: newMessage,
          createdAt: new Date(),
          senderRole: role,
        })
      });
      setNewMessage('');
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Chat</Typography>
        <List>
          {chatData.messages.map((msg, index) => (
            <Box key={index} sx={{
              display: 'flex',
              justifyContent: msg.senderRole === role ? 'flex-end' : 'flex-start',
              mb: 1,
            }}>
              <Box sx={{
                maxWidth: '70%',
                padding: 1,
                bgcolor: msg.senderRole === role ? 'primary.main' : 'grey.300',
                color: msg.senderRole === role ? 'white' : 'black',
                borderRadius: 2,
              }}>
                <Typography variant="body2">{msg.text}</Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>{msg.senderRole}</Typography>
              </Box>
            </Box>
          ))}
        </List>
      </Paper>
      <form onSubmit={sendMessage}>
        <TextField
          fullWidth
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          sx={{ mb: 1 }}
        />
        <Button variant="contained" color="primary" type="submit">Send</Button>
      </form>
    </Box>
  );
};

export default Chat;
