import React, { useState } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from './db';
import Chat from './Chat'; // Adjust the import path as necessary

const PatientChat = () => {
    const [userInput, setUserInput] = useState('');
    const [chatExists, setChatExists] = useState(false);
    const user_id = 1; // Assuming a fixed user_id for demonstration

    const handleStartChat = async () => {
        const uniqueDocument = `document_${user_id}`;
        const docRef = doc(firestore, 'chats', uniqueDocument);

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // Document exists, set chatExists to true to render the Chat component
                setChatExists(true);
            } else {
                // Document does not exist, create the document
                await setDoc(docRef, {
                    firstConversationText: userInput,
                    user_id: user_id,
                    created_at: serverTimestamp(),
                    messages: [],
                });
                // Set chatExists to true to immediately render the Chat component after creation
                setChatExists(true);
                // Reset the user input
                setUserInput('');
            }
        } catch (error) {
            console.error('Error accessing the document:', error);
        }
    };

    if (chatExists) {
        return <Chat userId="1" role="patient" />;
    }

    return (
        <div>
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
            />
            <button onClick={handleStartChat}>Start Chat</button>
        </div>
    );
};

export default PatientChat;
