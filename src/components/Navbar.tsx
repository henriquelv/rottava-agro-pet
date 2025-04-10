import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { FiMenu, FiX } from 'react-icons/fi';
import { AiOutlineHistory } from 'react-icons/ai';

const Navbar = () => {
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-700">
          Rottava Agro Pet
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors">
            Início
          </Link>
          <Link href="/produtos" className="text-gray-700 hover:text-green-600 transition-colors">
            Produtos
          </Link>
          <Link href="/history" className="text-gray-700 hover:text-green-600 transition-colors flex items-center">
            <AiOutlineHistory className="mr-1" />
            Pedidos
          </Link>
          <Link href="/cart" className="relative text-gray-700 hover:text-green-600 transition-colors">
            <HiOutlineShoppingBag size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-gray-700 py-2 hover:text-green-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              href="/produtos" 
              className="text-gray-700 py-2 hover:text-green-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Produtos
            </Link>
            <Link 
              href="/history" 
              className="text-gray-700 py-2 hover:text-green-600 transition-colors flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <AiOutlineHistory className="mr-1" />
              Meus Pedidos
            </Link>
            <Link 
              href="/cart" 
              className="text-gray-700 py-2 hover:text-green-600 transition-colors flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <HiOutlineShoppingBag className="mr-1" />
              Carrinho
              {cartItems.length > 0 && (
                <span className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 