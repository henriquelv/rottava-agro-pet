import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Rottava Agro Pet</h3>
            <p className="text-gray-300 mb-4">
              Tudo para o bem-estar do seu pet com a qualidade que você merece.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="text-gray-300 hover:text-white transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-gray-300 hover:text-white transition-colors">
                  Meus Pedidos
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/produtos/categoria/cao" className="text-gray-300 hover:text-white transition-colors">
                  Cães
                </Link>
              </li>
              <li>
                <Link href="/produtos/categoria/gato" className="text-gray-300 hover:text-white transition-colors">
                  Gatos
                </Link>
              </li>
              <li>
                <Link href="/produtos/categoria/acessorios" className="text-gray-300 hover:text-white transition-colors">
                  Acessórios
                </Link>
              </li>
              <li>
                <Link href="/produtos/categoria/higiene" className="text-gray-300 hover:text-white transition-colors">
                  Higiene
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: contato@rottavaagropet.com.br</li>
              <li>Telefone: (11) 9999-9999</li>
              <li>Rua Exemplo, 123 - Cidade</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Rottava Agro Pet. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 