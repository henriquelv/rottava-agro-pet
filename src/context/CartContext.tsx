import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import toastUtils from '../utils/toast';

interface CartItem {
  codigo: string;
  nome: string;
  preco: number;
  imagem: string;
  quantidade: number;
}

export interface FavoriteItem {
  id: string;
  name: string;
}

interface CartContextType {
  cartItems: CartItem[];
  favorites: FavoriteItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (codigo: string) => void;
  updateItemQuantity: (codigo: string, quantidade: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemsCount: () => number;
  addToFavorites: (id: string, name: string) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  favorites: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateItemQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getItemsCount: () => 0,
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
});

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
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

  // Carregar itens do carrinho do localStorage quando o componente montar
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho do localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Salvar itens do carrinho no localStorage quando houver mudanças
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      // Verificar se o item já existe no carrinho
      const existingItemIndex = prevItems.findIndex((i) => i.codigo === item.codigo);

      if (existingItemIndex >= 0) {
        // Se o item já existe, atualize a quantidade
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantidade += item.quantidade;
        toastUtils.productAdded(item.nome, item.quantidade);
        return updatedItems;
      } else {
        // Se o item não existe, adicione-o ao carrinho
        toastUtils.productAdded(item.nome, item.quantidade);
        return [...prevItems, item];
      }
    });
  };

  const removeFromCart = (codigo: string) => {
    setCartItems((prevItems) => {
      const item = prevItems.find(i => i.codigo === codigo);
      if (item) {
        toastUtils.productRemoved(item.nome);
      }
      return prevItems.filter((item) => item.codigo !== codigo);
    });
  };

  const updateItemQuantity = (codigo: string, quantidade: number) => {
    if (quantidade <= 0) {
      removeFromCart(codigo);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.codigo === codigo ? { ...item, quantidade } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toastUtils.info('Carrinho esvaziado');
  };

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

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.preco * item.quantidade, 0);
  };

  const getItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantidade, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        favorites,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
        getCartTotal,
        getItemsCount,
        addToFavorites,
        removeFromFavorites,
        isFavorite
      }}
    >
      {children}
    </CartContext.Provider>
  );
}; 