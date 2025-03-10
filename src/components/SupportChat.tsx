"use client";

import React, { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'support';
}

const SupportChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Olá! Como posso ajudar?', sender: 'support' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  return (
    <div className="chat-container bg-white shadow-md rounded-lg p-4">
      <div className="messages overflow-y-auto h-64 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message p-2 mb-2 rounded-lg max-w-xs ${
              message.sender === 'user' ? 'bg-primary text-white self-end' : 'bg-gray-200 text-black self-start'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-grow p-2 border rounded-l-lg focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-primary text-white p-2 rounded-r-lg"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default SupportChat; 