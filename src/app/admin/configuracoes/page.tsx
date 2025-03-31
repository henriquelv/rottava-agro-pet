'use client'

import React from 'react'
import { Gear } from 'phosphor-react'

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="mt-1 text-sm text-gray-600">
          Configure as opções do sistema
        </p>
      </div>

      <div className="bg-white rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Gear className="text-primary" size={32} />
        </div>
        <h2 className="text-xl font-semibold mb-2">Em Desenvolvimento</h2>
        <p className="text-gray-600">
          Esta funcionalidade estará disponível em breve.
        </p>
      </div>
    </div>
  )
} 