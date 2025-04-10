import React from 'react';
import { FaClockRotateLeft, FaCheck, FaGears, FaTruck, FaHouseCircleCheck, FaBan, FaMoneyBillTransfer } from "react-icons/fa6";

interface PurchaseStatusProps {
  status: string;
}

const statusMap: Record<string, { label: string; color: string, icon: React.ReactNode }> = {
  'pendente': { 
    label: 'Pendente', 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    icon: <FaClockRotateLeft className="mr-1" />
  },
  'confirmado': { 
    label: 'Confirmado', 
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    icon: <FaCheck className="mr-1" />
  },
  'processando': { 
    label: 'Processando', 
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    icon: <FaGears className="mr-1" />
  },
  'enviado': { 
    label: 'Enviado', 
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    icon: <FaTruck className="mr-1" />
  },
  'entregue': { 
    label: 'Entregue', 
    color: 'bg-green-100 text-green-800 border-green-300',
    icon: <FaHouseCircleCheck className="mr-1" />
  },
  'cancelado': { 
    label: 'Cancelado', 
    color: 'bg-red-100 text-red-800 border-red-300',
    icon: <FaBan className="mr-1" />
  },
  'reembolsado': { 
    label: 'Reembolsado', 
    color: 'bg-gray-100 text-gray-800 border-gray-300',
    icon: <FaMoneyBillTransfer className="mr-1" />
  },
};

const PurchaseStatus: React.FC<PurchaseStatusProps> = ({ status }) => {
  const statusInfo = statusMap[status.toLowerCase()] || { 
    label: status, 
    color: 'bg-gray-100 text-gray-800 border-gray-300',
    icon: null
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
      {statusInfo.icon}
      {statusInfo.label}
    </span>
  );
};

export default PurchaseStatus; 