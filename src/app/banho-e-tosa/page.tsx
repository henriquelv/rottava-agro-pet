'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import { AgendamentoModal } from '@/components/banho-tosa/AgendamentoModal'

const servicos = [
  {
    nome: 'Banho',
    descricao: 'Banho completo com produtos de qualidade e secagem profissional',
    preco: 50,
    precoGato: 45,
  },
  {
    nome: 'Tosa',
    descricao: 'Tosa higiênica ou na máquina com profissionais experientes',
    preco: 60,
    precoGato: 55,
  },
  {
    nome: 'Pacote Completo',
    descricao: 'Banho + tosa com preço especial',
    preco: 100,
    precoGato: 90,
  }
]

export default function BanhoETosa() {
  const [modalAberto, setModalAberto] = useState(false)
  const [servicoSelecionado, setServicoSelecionado] = useState<typeof servicos[0] | null>(null)

  function abrirModal(servico: typeof servicos[0]) {
    setServicoSelecionado(servico)
    setModalAberto(true)
  }

  return (
    <>
      <Header />
      <div className="pt-24 container">
        <h1 className="text-4xl font-bold text-text mb-8">Banho e Tosa</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-text mb-4">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicos.map((servico) => (
              <div key={servico.nome} className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{servico.nome}</h3>
                <p className="text-text/80 mb-4">{servico.descricao}</p>
                <div className="mb-4">
                  <p className="font-semibold">Preços:</p>
                  <p>Cães: R$ {servico.preco.toFixed(2)}</p>
                  <p>Gatos: R$ {servico.precoGato.toFixed(2)}</p>
                </div>
                <button 
                  className="btn-primary"
                  onClick={() => abrirModal(servico)}
                >
                  Agendar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {servicoSelecionado && (
        <AgendamentoModal
          isOpen={modalAberto}
          onClose={() => setModalAberto(false)}
          servico={{
            nome: servicoSelecionado.nome,
            preco: servicoSelecionado.preco
          }}
        />
      )}
    </>
  )
} 