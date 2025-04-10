'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Categoria {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
  imagem: string;
}

const CategoryList: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const buscarCategorias = async () => {
      try {
        const response = await fetch('/api/categorias');
        if (response.ok) {
          const data = await response.json();
          setCategorias(data);
        } else {
          toast.error('Erro ao carregar categorias');
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        toast.error('Falha ao carregar categorias');
      } finally {
        setIsLoading(false);
      }
    };

    buscarCategorias();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
      </div>
    );
  }

  if (categorias.length === 0) {
    return null;
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Categorias</h2>
        
        <div className="hidden md:block">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categorias.map((categoria) => (
              <Link
                key={categoria.id}
                href={`/produtos/categoria/${categoria.slug}`}
                className="group"
              >
                <div className="relative h-40 mb-3 overflow-hidden rounded-lg shadow-md group-hover:shadow-lg transition-all">
                  <Image
                    src={categoria.imagem || '/images/placeholder.jpg'}
                    alt={categoria.nome}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                    <div className="p-3 w-full">
                      <h3 className="text-white font-semibold">{categoria.nome}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="md:hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1.5}
            spaceBetween={16}
            navigation
            pagination={{ clickable: true }}
            loop={categorias.length > 3}
            centeredSlides={false}
            className="pb-10"
          >
            {categorias.map((categoria) => (
              <SwiperSlide key={categoria.id}>
                <Link
                  href={`/produtos/categoria/${categoria.slug}`}
                  className="block"
                >
                  <div className="relative h-40 mb-3 overflow-hidden rounded-lg shadow-md">
                    <Image
                      src={categoria.imagem || '/images/placeholder.jpg'}
                      alt={categoria.nome}
                      fill
                      className="object-cover"
                      sizes="90vw"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                      <div className="p-3 w-full">
                        <h3 className="text-white font-semibold">{categoria.nome}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CategoryList; 