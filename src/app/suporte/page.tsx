import React from 'react';
import SupportChat from '@/components/SupportChat';

const SuportePage: React.FC = () => {
  return (
    <div className="container mx-auto pt-24">
      <h1 className="text-3xl font-bold mb-4">Suporte</h1>
      <SupportChat />
    </div>
  );
};

export default SuportePage; 