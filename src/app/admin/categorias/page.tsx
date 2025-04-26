'use client'

import { useState, useEffect } from 'react'
import { PencilSimple, Trash, Plus } from 'phosphor-react'

interface Categoria {
  id: string
  nome: string
  slug: string
  total_produtos: number
}

export default function AdminCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null)
  const [formData, setFormData] = useState({ nome: '' })

  useEffect(() => {
    // Aqui você irá buscar as categorias da API
    const fetchCategorias = async () => {
      // Simulando dados
      const data = [
        { id: '1', nome: 'Rações', slug: 'racoes', total_produtos: 45 },
        { id: '2', nome: 'Acessórios', slug: 'acessorios', total_produtos: 32 },
        { id: '3', nome: 'Higiene', slug: 'higiene', total_produtos: 18 },
        { id: '4', nome: 'Medicamentos', slug: 'medicamentos', total_produtos: 24 },
      ]
      setCategorias(data)
      setLoading(false)
    }

    fetchCategorias()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Aqui você irá enviar os dados para a API
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (editingCategoria) {
        // Atualizar categoria existente
        setCategorias(prev => prev.map(cat => 
          cat.id === editingCategoria.id 
            ? { ...cat, nome: formData.nome, slug: formData.nome.toLowerCase().replace(/ /g, '-') }
            : cat
        ))
      } else {
        // Criar nova categoria
        const newCategoria: Categoria = {
          id: Math.random().toString(36).substr(2, 9),
          nome: formData.nome,
          slug: formData.nome.toLowerCase().replace(/ /g, '-'),
          total_produtos: 0
        }
        setCategorias(prev => [...prev, newCategoria])
      }

      setShowModal(false)
      setEditingCategoria(null)
      setFormData({ nome: '' })
    } catch (error) {
      alert('Erro ao salvar categoria')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (categoria: Categoria) => {
    setEditingCategoria(categoria)
    setFormData({ nome: categoria.nome })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return

    setLoading(true)
    try {
      // Aqui você irá enviar a requisição de delete para a API
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCategorias(prev => prev.filter(cat => cat.id !== id))
    } catch (error) {
      alert('Erro ao excluir categoria')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gerenciamento de Categorias</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Adicionar Categoria
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produtos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categorias.map((categoria) => (
                <tr key={categoria.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {categoria.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {categoria.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {categoria.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {categoria.total_produtos}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(categoria)}
                        className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <PencilSimple size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(categoria.id)}
                        className="p-2 text-gray-600 hover:text-red-500 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Trash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Edição/Criação */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingCategoria ? 'Editar Categoria' : 'Nova Categoria'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label 
                  htmlFor="nome" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome da Categoria
                </label>
                <input
                  type="text"
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ nome: e.target.value })}
                  className="mt-1 w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 