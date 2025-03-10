'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementará a lógica de envio do formulário
    console.log('Formulário enviado:', formData)
  }

  const horarios = [
    { dia: 'Segunda a Sexta', horario: '09:00 às 19:00' },
    { dia: 'Sábado', horario: '08:00 às 13:00' },
    { dia: 'Domingo', horario: 'Fechado' },
  ]

  // Sugestão de novos horários (comentado por enquanto)
  const novoHorarios = [
    { dia: 'Segunda a Sexta', horario: '08:30 às 19:00' },
    { dia: 'Sábado', horario: '08:00 às 16:00' },
    { dia: 'Domingo', horario: 'Fechado' },
  ]

  return (
    <>
      <Header />
      <div className="pt-24 container">
        <h1 className="text-4xl font-bold text-text mb-8">Contato</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulário de Contato */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-text mb-6">Envie sua mensagem</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-text mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-text mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium text-text mb-1">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              
              <button type="submit" className="btn-primary w-full">
                Enviar Mensagem
              </button>
            </form>
          </div>

          {/* Informações de Contato */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-text mb-6">Informações de Contato</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPinIcon className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Endereço</h3>
                    <p className="text-text/80">Rua Laguna, 74</p>
                    <p className="text-text/80">Esquina com Rua Brusque, 198</p>
                    <p className="text-text/80">Caçador - SC, 89504-640</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <PhoneIcon className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Telefone & WhatsApp</h3>
                    <a 
                      href="tel:+5549998194572" 
                      className="text-text/80 hover:text-primary transition-colors"
                    >
                      (49) 99819-4572
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <EnvelopeIcon className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a 
                      href="mailto:contato@rottavaagropet.com.br" 
                      className="text-text/80 hover:text-primary transition-colors"
                    >
                      contato@rottavaagropet.com.br
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <ClockIcon className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Horário de Funcionamento</h3>
                    {horarios.map((horario) => (
                      <div key={horario.dia} className="flex justify-between text-text/80">
                        <span className="font-medium">{horario.dia}:</span>
                        <span>{horario.horario}</span>
                      </div>
                    ))}
                    <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm font-medium text-primary">
                        Sugestão de Novos Horários (em análise):
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-text/80">
                        <li>• Segunda a Sexta: 08:30 às 19:00</li>
                        <li>• Sábado: 08:00 às 16:00</li>
                        <li>• Domingo: Fechado</li>
                      </ul>
                      <p className="mt-2 text-xs text-text/60">
                        * Horário estendido aos sábados para melhor atender nossos clientes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa do Google */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.5123456789!2d-51.012345!3d-27.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDA3JzM0LjQiUyA1McKwMDAnNDUuNiJX!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 