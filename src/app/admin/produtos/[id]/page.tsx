'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Upload, Trash, Plus } from 'phosphor-react'
import { toast } from 'sonner'

interface ProdutoFormData {
  nome: string
  preco_venda: number
  preco_promocional?: number
  categoria: string
  imagens: string[]
  em_promocao: boolean
  descricao: string
  peso?: string
}

export default function EditarProdutoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const isNew = params.id === 'novo'
  const [loading, setLoading] = useState(false)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const [formData, setFormData] = useState<ProdutoFormData>({
    nome: '',
    preco_venda: 0,
    categoria: '',
    imagens: [],
    em_promocao: false,
    descricao: ''
  })

  useEffect(() => {
    if (!isNew) {
      // Aqui você irá buscar os dados do produto da API
      const fetchProduto = async () => {
        // Simulando dados
        setFormData({
          nome: 'Ração Golden Special para Cães Adultos',
          preco_venda: 159.90,
          preco_promocional: 129.90,
          categoria: 'Rações',
          imagens: ['/produtos/racao-golden.jpg', '/produtos/racao-golden-2.jpg'],
          em_promocao: true,
          descricao: 'Ração premium para cães adultos.',
          peso: '15kg'
        })
        setImagePreviews(['/produtos/racao-golden.jpg', '/produtos/racao-golden-2.jpg'])
      }

      fetchProduto()
    }
  }, [isNew])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Aqui você irá enviar os dados para a API
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Produto salvo com sucesso!')
      router.push('/admin/produtos')
    } catch (error) {
      toast.error('Erro ao salvar produto')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newPreviews: string[] = []
    const newImages: string[] = []

    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviews.push(reader.result as string)
        newImages.push(file.name)
        
        if (newPreviews.length === files.length) {
          setImagePreviews(prev => [...prev, ...newPreviews])
          setFormData(prev => ({ ...prev, imagens: [...prev.imagens, ...newImages] }))
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
    setFormData(prev => ({
      ...prev,
      imagens: prev.imagens.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {isNew ? 'Novo Produto' : 'Editar Produto'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Imagens */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Imagens do Produto
          </label>
          <div className="flex flex-wrap gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative w-32 h-32">
                <Image
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash size={16} />
                </button>
              </div>
            ))}
            
            <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <Plus size={24} className="text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">
                Adicionar
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Nome */}
        <div className="space-y-2">
          <label 
            htmlFor="nome" 
            className="block text-sm font-medium text-gray-700"
          >
            Nome do Produto
          </label>
          <input
            type="text"
            id="nome"
            value={formData.nome}
            onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>

        {/* Preços */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label 
              htmlFor="preco_venda" 
              className="block text-sm font-medium text-gray-700"
            >
              Preço de Venda
            </label>
            <input
              type="number"
              id="preco_venda"
              value={formData.preco_venda}
              onChange={(e) => setFormData(prev => ({ ...prev, preco_venda: Number(e.target.value) }))}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="preco_promocional" 
              className="block text-sm font-medium text-gray-700"
            >
              Preço Promocional
            </label>
            <input
              type="number"
              id="preco_promocional"
              value={formData.preco_promocional || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, preco_promocional: Number(e.target.value) }))}
              step="0.01"
              min="0"
              disabled={!formData.em_promocao}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Categoria */}
        <div className="space-y-2">
          <label 
            htmlFor="categoria" 
            className="block text-sm font-medium text-gray-700"
          >
            Categoria
          </label>
          <select
            id="categoria"
            value={formData.categoria}
            onChange={(e) => setFormData(prev => ({ ...prev, categoria: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="Rações">Rações</option>
            <option value="Medicamentos">Medicamentos</option>
            <option value="Acessórios">Acessórios</option>
          </select>
        </div>

        {/* Descrição */}
        <div className="space-y-2">
          <label 
            htmlFor="descricao" 
            className="block text-sm font-medium text-gray-700"
          >
            Descrição
          </label>
          <textarea
            id="descricao"
            value={formData.descricao}
            onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Peso */}
        <div className="space-y-2">
          <label 
            htmlFor="peso" 
            className="block text-sm font-medium text-gray-700"
          >
            Peso
          </label>
          <input
            type="text"
            id="peso"
            value={formData.peso || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, peso: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Em Promoção */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="em_promocao"
            checked={formData.em_promocao}
            onChange={(e) => setFormData(prev => ({ ...prev, em_promocao: e.target.checked }))}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="em_promocao" className="ml-2 block text-sm text-gray-700">
            Em Promoção
          </label>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  )
} 