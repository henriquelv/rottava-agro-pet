'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const banners = [
  {
    id: 1,
    image: '/banners/banner1.jpg',
    title: 'Produtos de Qualidade',
    description: 'As melhores marcas para seu pet',
    link: '/produtos'
  },
  {
    id: 2,
    image: '/banners/banner2.jpg',
    title: 'Banho & Tosa',
    description: 'Cuidados especiais para seu amigo',
    link: '/banho-e-tosa'
  },
  {
    id: 3,
    image: '/banners/banner3.jpg',
    title: 'Atendimento Veterinário',
    description: 'Profissionais especializados',
    link: '/servicos'
  }
]

export function Banner() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link href={banner.link} className="relative block w-full h-full">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                priority={banner.id === 1}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{banner.title}</h2>
                <p className="text-xl md:text-2xl">{banner.description}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
} 