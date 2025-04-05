import { Metadata } from 'next'
import Link from 'next/link'
import { 
  PawPrint, 
  FirstAid, 
  House, 
  Dog 
} from 'phosphor-react'

export const metadata: Metadata = {
  title: 'Serviços | Rottava Agro Pet',
  description: 'Conheça nossos serviços para seu pet',
}

export default function ServicosPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Nossos Serviços</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link 
          href="/banho-e-tosa"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-4 mb-4">
            <PawPrint size={32} className="text-primary" />
            <h2 className="text-2xl font-semibold">Banho e Tosa</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Oferecemos serviços de banho e tosa profissional para seu pet, com produtos de qualidade e profissionais especializados.
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Banho com produtos hipoalergênicos</li>
            <li>Tosa higiênica</li>
            <li>Tosa completa</li>
            <li>Hidratação</li>
            <li>Escovação</li>
          </ul>
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <FirstAid size={32} className="text-primary" />
            <h2 className="text-2xl font-semibold">Veterinário</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Atendimento veterinário completo para seu pet, com profissionais qualificados e equipamentos modernos.
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Consultas</li>
            <li>Vacinação</li>
            <li>Exames</li>
            <li>Cirurgias</li>
            <li>Emergências</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <House size={32} className="text-primary" />
            <h2 className="text-2xl font-semibold">Hotel</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Hotel para seu pet com toda a comodidade e segurança que ele merece.
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Área de lazer</li>
            <li>Monitoramento 24h</li>
            <li>Alimentação especial</li>
            <li>Banho incluso</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <Dog size={32} className="text-primary" />
            <h2 className="text-2xl font-semibold">Adestramento</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Serviços de adestramento para melhorar o comportamento do seu pet.
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Adestramento básico</li>
            <li>Adestramento avançado</li>
            <li>Correção de comportamento</li>
            <li>Socialização</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 