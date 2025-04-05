'use client'

import React, { useState } from 'react'
import { X, Plus, Trash, Upload } from 'phosphor-react'
import { Product, ProductVariant, ProductAttribute } from '@/types/product'

interface ProductFormProps {
  product?: Product
  onClose: () => void
  onSubmit: (product: Partial<Product>) => Promise<void>
}

export function ProductForm({ product, onClose, onSubmit }: ProductFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      status: 'draft',
      images: [],
      variants: [],
      attributes: []
    }
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = parseFloat(e.target.value)
    if (!isNaN(value)) {
      setFormData({ ...formData, [field]: value })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // Simular upload de imagens
    const newImages = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      alt: file.name
    }))

    setFormData({
      ...formData,
      images: [...(formData.images || []), ...newImages]
    })
  }

  const removeImage = (index: number) => {
    const newImages = [...(formData.images || [])]
    newImages.splice(index, 1)
    setFormData({ ...formData, images: newImages })
  }

  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: Date.now().toString(),
      name: '',
      price: 0,
      stock: 0,
      attributes: []
    }

    setFormData({
      ...formData,
      variants: [...(formData.variants || []), newVariant]
    })
  }

  const updateVariant = (index: number, data: Partial<ProductVariant>) => {
    const newVariants = [...(formData.variants || [])]
    newVariants[index] = { ...newVariants[index], ...data }
    setFormData({ ...formData, variants: newVariants })
  }

  const removeVariant = (index: number) => {
    const newVariants = [...(formData.variants || [])]
    newVariants.splice(index, 1)
    setFormData({ ...formData, variants: newVariants })
  }

  const addAttribute = () => {
    const newAttribute: ProductAttribute = {
      name: '',
      value: ''
    }

    setFormData({
      ...formData,
      attributes: [...(formData.attributes || []), newAttribute]
    })
  }

  const updateAttribute = (index: number, data: Partial<ProductAttribute>) => {
    const newAttributes = [...(formData.attributes || [])]
    newAttributes[index] = { ...newAttributes[index], ...data }
    setFormData({ ...formData, attributes: newAttributes })
  }

  const removeAttribute = (index: number) => {
    const newAttributes = [...(formData.attributes || [])]
    newAttributes.splice(index, 1)
    setFormData({ ...formData, attributes: newAttributes })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      await onSubmit(formData)
      onClose()
    } catch (err) {
      setError('Erro ao salvar produto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {product ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-129px)]">
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código do Produto
                </label>
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marca
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição Curta
              </label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                placeholder="Breve descrição do produto para exibição na listagem"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição Detalhada
              </label>
              <textarea
                name="descricao_detalhada"
                value={formData.descricao_detalhada || ''}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                placeholder="Descrição completa do produto com todas as informações relevantes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
              >
                <option value="draft">Rascunho</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>

            {/* Preços e Estoque */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    R$
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    value={formData.price || ''}
                    onChange={(e) => handleNumberChange(e, 'price')}
                    className="w-full pl-8 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço Promocional
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    R$
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="compareAtPrice"
                    value={formData.compareAtPrice || ''}
                    onChange={(e) => handleNumberChange(e, 'compareAtPrice')}
                    className="w-full pl-8 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custo
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    R$
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="cost"
                    value={formData.cost || ''}
                    onChange={(e) => handleNumberChange(e, 'cost')}
                    className="w-full pl-8 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estoque
                </label>
                <input
                  type="number"
                  min="0"
                  name="stock"
                  value={formData.stock || ''}
                  onChange={(e) => handleNumberChange(e, 'stock')}
                  className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estoque Mínimo
                </label>
                <input
                  type="number"
                  min="0"
                  name="minStock"
                  value={formData.minStock || ''}
                  onChange={(e) => handleNumberChange(e, 'minStock')}
                  className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estoque Máximo
                </label>
                <input
                  type="number"
                  min="0"
                  name="maxStock"
                  value={formData.maxStock || ''}
                  onChange={(e) => handleNumberChange(e, 'maxStock')}
                  className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Códigos */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código de Barras
                </label>
                <input
                  type="text"
                  name="barcode"
                  value={formData.barcode || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Dimensões */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Dimensões
              </h3>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="weight"
                    value={formData.weight || ''}
                    onChange={(e) => handleNumberChange(e, 'weight')}
                    className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    name="dimensions.height"
                    value={formData.dimensions?.height || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dimensions: {
                          ...(formData.dimensions || {}),
                          height: parseFloat(e.target.value)
                        }
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Largura (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    name="dimensions.width"
                    value={formData.dimensions?.width || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dimensions: {
                          ...(formData.dimensions || {}),
                          width: parseFloat(e.target.value)
                        }
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Comprimento (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    name="dimensions.length"
                    value={formData.dimensions?.length || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dimensions: {
                          ...(formData.dimensions || {}),
                          length: parseFloat(e.target.value)
                        }
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            {/* Imagens */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Imagens
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {formData.images?.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden group"
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash className="text-white" size={24} />
                    </button>
                  </div>
                ))}
                <label className="aspect-square rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Upload className="text-gray-400" size={24} />
                </label>
              </div>
            </div>

            {/* Variantes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Variantes
                </h3>
                <button
                  type="button"
                  onClick={addVariant}
                  className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark"
                >
                  <Plus size={16} />
                  <span>Adicionar Variante</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.variants?.map((variant, index) => (
                  <div
                    key={variant.id}
                    className="p-4 bg-gray-50 rounded-lg space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">
                        Variante {index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nome
                        </label>
                        <input
                          type="text"
                          value={variant.name}
                          onChange={(e) =>
                            updateVariant(index, { name: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preço
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            R$
                          </span>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={variant.price}
                            onChange={(e) =>
                              updateVariant(index, {
                                price: parseFloat(e.target.value)
                              })
                            }
                            className="w-full pl-8 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Estoque
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={variant.stock}
                          onChange={(e) =>
                            updateVariant(index, {
                              stock: parseInt(e.target.value)
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Atributos */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Atributos
                </h3>
                <button
                  type="button"
                  onClick={addAttribute}
                  className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark"
                >
                  <Plus size={16} />
                  <span>Adicionar Atributo</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.attributes?.map((attribute, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4"
                  >
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Nome do atributo"
                        value={attribute.name}
                        onChange={(e) =>
                          updateAttribute(index, { name: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Valor do atributo"
                        value={attribute.value}
                        onChange={(e) =>
                          updateAttribute(index, { value: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttribute(index)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>
        </form>

        {/* Ações */}
        <div className="flex items-center justify-end gap-3 p-6 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{loading ? 'Salvando...' : 'Salvar'}</span>
          </button>
        </div>
      </div>
    </div>
  )
} 