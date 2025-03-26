'use client'

import React, { useState } from 'react'
import { CaretDown, CaretUp } from 'phosphor-react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqItems: FAQItem[] = [
  {
    question: 'Como faço para agendar um banho e tosa?',
    answer: 'Você pode agendar através do nosso site na seção "Banho e Tosa", pelo WhatsApp ou ligando para nossa loja. Recomendamos o agendamento com pelo menos 24h de antecedência.',
    category: 'Serviços'
  },
  {
    question: 'Qual o prazo de entrega dos produtos?',
    answer: 'O prazo de entrega varia de acordo com sua localização. Para a região de Caçador, realizamos entregas em até 24 horas. Para outras regiões, o prazo pode variar de 2 a 5 dias úteis.',
    category: 'Entregas'
  },
  {
    question: 'Como funciona a troca de produtos?',
    answer: 'Aceitamos trocas em até 7 dias após o recebimento, desde que o produto esteja em sua embalagem original e não tenha sido utilizado. Entre em contato com nosso suporte para iniciar o processo.',
    category: 'Trocas'
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos cartões de crédito e débito, PIX, boleto bancário e dinheiro (para compras na loja física).',
    category: 'Pagamentos'
  },
  {
    question: 'Como faço para me cadastrar no programa de fidelidade?',
    answer: 'O cadastro é automático ao criar uma conta em nossa loja. Você acumula pontos em todas as compras e pode trocar por descontos e benefícios exclusivos.',
    category: 'Fidelidade'
  },
  {
    question: 'Vocês oferecem consultas veterinárias?',
    answer: 'Sim, contamos com veterinários parceiros que atendem em nossa loja. As consultas devem ser agendadas previamente através do nosso WhatsApp ou telefone.',
    category: 'Serviços'
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', ...new Set(faqItems.map(item => item.category))]

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const filteredItems = selectedCategory === 'all'
    ? faqItems
    : faqItems.filter(item => item.category === selectedCategory)

  return (
    <div className="container mx-auto pt-24 px-4 pb-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Perguntas Frequentes
      </h1>

      {/* Filtro por categorias */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-background hover:bg-primary/10'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Lista de FAQs */}
      <div className="max-w-3xl mx-auto space-y-4">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <span className="font-medium">{item.question}</span>
              {openItems.includes(index) ? (
                <CaretUp className="text-primary" size={20} />
              ) : (
                <CaretDown className="text-text/40" size={20} />
              )}
            </button>
            {openItems.includes(index) && (
              <div className="px-6 pb-4 text-text/80">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contato adicional */}
      <div className="mt-12 text-center">
        <p className="text-text/60">
          Não encontrou o que procurava?
        </p>
        <a
          href="/contato"
          className="text-primary hover:text-primary-dark transition-colors"
        >
          Entre em contato conosco
        </a>
      </div>
    </div>
  )
} 