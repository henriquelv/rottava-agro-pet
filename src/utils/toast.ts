import toast from 'react-hot-toast';

const TOAST_DURATION = 3000; // 3 segundos
const SUCCESS_STYLE = { background: '#10B981', color: 'white' };
const ERROR_STYLE = { background: '#EF4444', color: 'white' };
const INFO_STYLE = { background: '#3B82F6', color: 'white' };

export const toastSuccess = (message: string) => {
  toast.success(message, {
    duration: TOAST_DURATION,
    style: SUCCESS_STYLE,
  });
};

export const toastError = (message: string) => {
  toast.error(message, {
    duration: TOAST_DURATION,
    style: ERROR_STYLE,
  });
};

export const toastInfo = (message: string) => {
  toast(message, {
    duration: TOAST_DURATION,
    style: INFO_STYLE,
  });
};

export const toastProductAdded = (productName: string, quantity: number = 1) => {
  toastSuccess(`${quantity}x ${productName} ${quantity === 1 ? 'adicionado' : 'adicionados'} ao carrinho`);
};

export const toastProductRemoved = (productName: string) => {
  toastInfo(`${productName} removido do carrinho`);
};

export const toastQuantityUpdated = (productName: string, quantity: number) => {
  toastInfo(`Quantidade de ${productName} atualizada para ${quantity}`);
};

export const toastCheckoutSuccess = () => {
  toastSuccess('Pedido realizado com sucesso! Obrigado pela sua compra.');
};

export const toastOutOfStock = (productName: string) => {
  toastError(`${productName} está fora de estoque`);
};

const toastUtils = {
  success: (message: string) => {
    toast.success(message);
  },
  
  error: (message: string) => {
    toast.error(message);
  },
  
  info: (message: string) => {
    toast(message, {
      icon: '📢',
      style: {
        border: '1px solid #3B82F6',
        borderRadius: '0.5rem',
        background: '#EFF6FF',
        color: '#1E40AF',
      },
    });
  },
  
  warning: (message: string) => {
    toast(message, {
      icon: '⚠️',
      style: {
        border: '1px solid #F59E0B',
        borderRadius: '0.5rem',
        background: '#FFFBEB',
        color: '#9A3412',
      },
    });
  },
  
  productAdded: (productName: string, quantity: number = 1) => {
    toast.success(
      `${quantity > 1 ? `${quantity}x ` : ''}${productName} adicionado ao carrinho!`
    );
  },
  
  productRemoved: (productName: string) => {
    toast(`${productName} removido do carrinho`, {
      icon: '🗑️',
      style: {
        borderRadius: '0.5rem',
        background: '#FEF2F2',
        color: '#991B1B',
      },
    });
  },
  
  quantityUpdated: (productName: string, quantity: number) => {
    toast(`Quantidade de ${productName} atualizada para ${quantity}`, {
      icon: '✏️',
      style: {
        borderRadius: '0.5rem',
        background: '#F0FDF4',
        color: '#166534',
      },
    });
  },
};

export default toastUtils; 