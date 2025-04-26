'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import toastUtils from '../utils/toast';
import { Product } from '@/types/product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextData {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  totalItems: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('@RottavaAgroPet:cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('@RottavaAgroPet:cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}

export interface FavoriteItem {
  id: string;
  name: string;
}

interface CartContextType {
  favorites: FavoriteItem[];
  addToFavorites: (id: string, name: string) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const CartContextType = createContext<CartContextType>({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
});

export const useCartType = () => useContext(CartContextType);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProviderType: React.FC<CartProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('favorites');
      // Compatibilidade com o formato anterior (array de strings)
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        if (Array.isArray(parsedFavorites) && parsedFavorites.length > 0) {
          if (typeof parsedFavorites[0] === 'string') {
            // Converter de formato antigo para novo
            return parsedFavorites.map(id => ({ id, name: 'Produto' }));
          }
          return parsedFavorites;
        }
      }
      return [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const addToFavorites = (id: string, name: string) => {
    if (!favorites.some(fav => fav.id === id)) {
      setFavorites([...favorites, { id, name }]);
      toastUtils.success(`${name} adicionado aos favoritos`);
    }
  };

  const removeFromFavorites = (id: string) => {
    const item = favorites.find(fav => fav.id === id);
    setFavorites(favorites.filter(fav => fav.id !== id));
    if (item) {
      toastUtils.info(`${item.name} removido dos favoritos`);
    } else {
      toastUtils.info('Item removido dos favoritos');
    }
  };

  const isFavorite = (id: string) => favorites.some(fav => fav.id === id);

  return (
    <CartContextType.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
      }}
    >
      {children}
    </CartContextType.Provider>
  );
}; 