"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

interface BaseCartItem {
  id: string;
  nome: string;
  preco: number;
}

interface ProdutoCartItem extends BaseCartItem {
  imagem: string;
  variante: string;
  quantidade: number;
  tipo: 'produto';
}

interface AgendamentoCartItem extends BaseCartItem {
  data: string;
  horario: string;
  tipo: 'agendamento';
}

export type CartItem = ProdutoCartItem | AgendamentoCartItem;

interface CartContextProps {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantidade: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // Carregar itens do localStorage ao iniciar
  useEffect(() => {
    const savedItems = localStorage.getItem('cartItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Salvar itens no localStorage quando houver mudanças
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
    
    // Calcular total
    const newTotal = items.reduce((acc, item) => {
      if (item.tipo === 'produto') {
        return acc + (item.preco * item.quantidade);
      }
      return acc + item.preco;
    }, 0);
    setTotal(newTotal);

    // Calcular quantidade total de itens
    const newItemCount = items.reduce((acc, item) => {
      if (item.tipo === 'produto') {
        return acc + item.quantidade;
      }
      return acc + 1;
    }, 0);
    setItemCount(newItemCount);
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems((prevItems) => {
      if (item.tipo === 'produto') {
        const existingItem = prevItems.find(
          (i) => 
            i.id === item.id && 
            i.tipo === 'produto' && 
            (i as ProdutoCartItem).variante === (item as ProdutoCartItem).variante
        );

        if (existingItem && existingItem.tipo === 'produto') {
          const updatedItems = prevItems.map((i) =>
            i.id === item.id && i.tipo === 'produto'
              ? { ...i, quantidade: i.quantidade + (item as ProdutoCartItem).quantidade }
              : i
          );
          toast.success('Quantidade atualizada no carrinho!');
          return updatedItems;
        }
      }

      toast.success('Item adicionado ao carrinho!');
      return [...prevItems, item];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((i) => i.id !== itemId);
      toast.success('Item removido do carrinho!');
      return updatedItems;
    });
  };

  const updateQuantity = (itemId: string, quantidade: number) => {
    if (quantidade < 1) {
      removeFromCart(itemId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId && item.tipo === 'produto') {
          return { ...item, quantidade };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cartItems');
    toast.success('Carrinho limpo com sucesso!');
  };

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        total,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

export type { AgendamentoCartItem };
export { CartContext }; 