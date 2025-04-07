'use client'

import { Star } from 'phosphor-react'

const testimonials = [
  {
    id: 1,
    name: 'Maria Silva',
    avatar: '/avatars/maria.jpg',
    rating: 5,
    text: 'Excelente atendimento! A equipe é muito prestativa e os produtos são de ótima qualidade. Meu cachorro adora a ração que compro aqui.',
    pet: 'Thor (Golden Retriever)'
  },
  {
    id: 2,
    name: 'João Santos',
    avatar: '/avatars/joao.jpg',
    rating: 5,
    text: 'Preços justos e entrega rápida. Sempre encontro tudo o que preciso para meus pets. Recomendo!',
    pet: 'Nina (Gata Siamês)'
  },
  {
    id: 3,
    name: 'Ana Paula',
    avatar: '/avatars/ana.jpg',
    rating: 5,
    text: 'O serviço de banho e tosa é maravilhoso! Minha cachorrinha sempre volta linda e cheirosa.',
    pet: 'Mel (Shih Tzu)'
  }
]

export function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">O que nossos clientes dizem</h2>
        <p className="text-text/60 text-center mb-12">
          A satisfação dos nossos clientes é nossa maior recompensa
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200" />
                <div>
                  <h3 className="font-semibold text-text">{testimonial.name}</h3>
                  <p className="text-sm text-text/60">{testimonial.pet}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className="text-yellow-400"
                    weight="fill"
                    size={20}
                  />
                ))}
              </div>

              <p className="text-text/80 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 