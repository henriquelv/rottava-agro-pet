import React from 'react';

interface PurchaseStatusProps {
  status: string;
}

const statusMap: Record<string, { label: string; color: string }> = {
  pendente: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
  confirmado: { label: 'Confirmado', color: 'bg-blue-100 text-blue-800' },
  processando: { label: 'Processando', color: 'bg-sky-100 text-sky-800' },
  enviado: { label: 'Enviado', color: 'bg-purple-100 text-purple-800' },
  entregue: { label: 'Entregue', color: 'bg-green-100 text-green-800' },
  cancelado: { label: 'Cancelado', color: 'bg-red-100 text-red-800' },
  reembolsado: { label: 'Reembolsado', color: 'bg-orange-100 text-orange-800' },
};

const PurchaseStatus: React.FC<PurchaseStatusProps> = ({ status }) => {
  const statusInfo = statusMap[status.toLowerCase()] || {
    label: status,
    color: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
      {statusInfo.label}
    </span>
  );
};

export default PurchaseStatus; 