import { X } from 'phosphor-react'
import { useState, useContext } from 'react'
import { CartContext } from '@/hooks/CartContext'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { AgendamentoCartItem } from '@/hooks/CartContext'

interface AgendamentoModalProps {
  isOpen: boolean
  onClose: () => void
  servico: {
    nome: string
    preco: number
  }
}

export function AgendamentoModal({ isOpen, onClose, servico }: AgendamentoModalProps) {
  const [animal, setAnimal] = useState('')
  const [raca, setRaca] = useState('')
  const [data, setData] = useState('')
  const [horario, setHorario] = useState('')
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  const { addToCart } = context
  const router = useRouter()

  if (!isOpen) return null

  const horariosDisponiveis = [
    '08:00', '09:00', '10:00', '11:00',
    '13:00', '14:00', '15:00', '16:00'
  ]

  const animais = ['Cão', 'Gato']
  const racas = {
    'Cão': ['Golden Retriever', 'Husky Siberiano', 'Labrador', 'Pastor Alemão', 'Poodle', 'Bulldog', 'Outro'],
    'Gato': ['Persa', 'Siamês', 'Maine Coon', 'Angorá', 'Outro']
  }

  function handleAgendamento() {
    const agendamento: AgendamentoCartItem = {
      id: Math.random().toString(36).substring(7),
      nome: `${servico.nome} - ${animal} ${raca}`,
      preco: servico.preco,
      data,
      horario,
      tipo: 'agendamento'
    }

    addToCart(agendamento)
    onClose()
    
    toast.success('Agendamento realizado! Para finalizar a compra, dirija-se ao carrinho', {
      action: {
        label: 'Ir para o carrinho',
        onClick: () => router.push('/carrinho')
      },
      duration: 5000
    })
  }

  // Desabilita datas anteriores a hoje
  const hoje = new Date().toISOString().split('T')[0]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Agendar {servico.nome}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Animal</label>
            <select
              value={animal}
              onChange={(e) => {
                setAnimal(e.target.value)
                setRaca('')
              }}
              className="w-full border rounded-md p-2"
            >
              <option value="">Selecione o animal</option>
              {animais.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {animal && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Raça</label>
              <select
                value={raca}
                onChange={(e) => setRaca(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">Selecione a raça</option>
                {racas[animal as keyof typeof racas].map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input
              type="date"
              min={hoje}
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          {data && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
              <select
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">Selecione o horário</option>
                {horariosDisponiveis.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleAgendamento}
            disabled={!animal || !raca || !data || !horario}
            className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Realizar Agendamento
          </button>
        </div>
      </div>
    </div>
  )
} 