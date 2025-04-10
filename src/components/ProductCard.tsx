import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCart } from '@/context/CartContext';
import { FaCartPlus, FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  quantity_available: number;
  category: string;
  brand?: string;
  onSale?: boolean;
  salePrice?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  description,
  quantity_available,
  category,
  brand,
  onSale,
  salePrice
}) => {
  const router = useRouter();
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  const displayPrice = onSale && salePrice ? salePrice : price;
  const outOfStock = quantity_available <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (outOfStock) {
      toast.error('Produto sem estoque');
      return;
    }
    
    addToCart({
      id,
      name,
      price: displayPrice,
      quantity: 1
    });
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id, name);
    }
  };

  const handleCardClick = () => {
    router.push(`/produto/${id}`);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/placeholder-image.jpg';
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl cursor-pointer transform hover:-translate-y-1"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
          priority={false}
          onError={handleImageError}
        />
        {outOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold">Sem estoque</span>
          </div>
        )}
        <button 
          onClick={handleFavoriteToggle}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md transition-colors"
          aria-label={isFavorite(id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {isFavorite(id) ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-gray-400 hover:text-red-500 text-xl" />
          )}
        </button>
        {onSale && (
          <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">
            PROMOÇÃO
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 truncate">{name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between mt-3">
          <div>
            {onSale && salePrice ? (
              <div>
                <span className="text-gray-400 line-through text-sm">R$ {price.toFixed(2)}</span>
                <span className="font-bold text-red-500 ml-2">R$ {salePrice.toFixed(2)}</span>
              </div>
            ) : (
              <span className="font-bold text-gray-800">R$ {price.toFixed(2)}</span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            className={`p-2 rounded-full ${
              outOfStock 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600'
            } transition-colors`}
            aria-label="Adicionar ao carrinho"
          >
            <FaCartPlus className="text-white text-xl" />
          </button>
        </div>
        
        {isHovered && quantity_available > 0 && quantity_available <= 5 && (
          <p className="text-sm text-orange-500 mt-2">
            Apenas {quantity_available} {quantity_available === 1 ? 'unidade' : 'unidades'} em estoque!
          </p>
        )}
        
        {brand && (
          <p className="text-xs text-gray-500 mt-2">Marca: {brand}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard; 