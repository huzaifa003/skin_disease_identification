import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './db';
import Chat from './Chat'; // Ensure this path is correct

const DermatologistChat = ({ dermatologistId }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      const querySnapshot = await getDocs(collection(firestore, "chats"));
      const loadedConversations = [];
      querySnapshot.forEach((doc) => {
        // Assuming the document ID format is "document_userId"
        const userId = doc.id.split("_").pop(); // Extract the userId from the document ID
        loadedConversations.push({ id: doc.id, userId, ...doc.data() });
      });
      setConversations(loadedConversations);
    };

    fetchConversations();
  }, []);

  if (selectedUserId) {
    // Render the Chat component with the selected user's ID and role "dermatologist"
    return <Chat userId={selectedUserId} role="dermatologist" />;
  }

  return (
    <div>
      <h2>Conversations</h2>
      {conversations.map((conversation) => (
        <div key={conversation.id} onClick={() => setSelectedUserId(conversation.userId)}>
          Conversation with User ID {conversation.userId}
        </div>
      ))}
    </div>
  );
};

export default DermatologistChat;
