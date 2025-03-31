'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import { WavyBackground } from '@/components/layout/WavyBackground'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { 
  Dog, 
  Cat, 
  Bird, 
  Fish, 
  Horse, 
  ShoppingBag,
  Star,
  CaretDown,
  Funnel,
  Package
} from 'phosphor-react'
import { categories, products, Product } from '@/data/products'

export default function ProdutosCategoria() {
  const params = useParams()
  const slug = params.slug as keyof typeof categories
  const infoCategoria = categories[slug]
  const Icone = infoCategoria?.icone || Package

  const [precoSelecionado, setPrecoSelecionado] = useState('')
  const [marcaSelecionada, setMarcaSelecionada] = useState('')
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState('')
  const [subsubcategoriaSelecionada, setSubsubcategoriaSelecionada] = useState('')
  const [ordenacao, setOrdenacao] = useState('')
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [produtosFiltrados, setProdutosFiltrados] = useState<Product[]>([])

  // Filtra os produtos baseado nos filtros selecionados
  useEffect(() => {
    let filtered = products.filter(product => product.category === slug)

    if (subcategoriaSelecionada) {
      filtered = filtered.filter(product => product.subcategory === subcategoriaSelecionada)
    }

    if (subsubcategoriaSelecionada) {
      filtered = filtered.filter(product => product.subsubcategory === subsubcategoriaSelecionada)
    }

    if (precoSelecionado) {
      const [min, max] = precoSelecionado.split('-').map(Number)
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max
        } else {
          return product.price >= min
        }
      })
    }

    if (marcaSelecionada) {
      filtered = filtered.filter(product => product.brand.toLowerCase() === marcaSelecionada)
    }

    // Ordenação
    switch (ordenacao) {
      case 'preco-menor':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'preco-maior':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'mais-vendidos':
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
        break
      default:
        // Relevância (padrão)
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }

    setProdutosFiltrados(filtered)
  }, [slug, subcategoriaSelecionada, subsubcategoriaSelecionada, precoSelecionado, marcaSelecionada, ordenacao])

  if (!infoCategoria) {
    return (
      <WavyBackground>
        <Header />
        <div className="container py-20">
          <h1 className="text-2xl font-bold text-center">Categoria não encontrada</h1>
        </div>
      </WavyBackground>
    )
  }

  // Obtém as subcategorias disponíveis
  const subcategorias = Object.entries(infoCategoria.subcategories).map(([key, value]) => ({
    value: key,
    label: value.name
  }))

  // Obtém as subsubcategorias da subcategoria selecionada
  const subsubcategorias = subcategoriaSelecionada 
    ? infoCategoria.subcategories[subcategoriaSelecionada as keyof typeof infoCategoria.subcategories]?.subsubcategories.map(sub => ({
        value: sub,
        label: sub.charAt(0).toUpperCase() + sub.slice(1).replace(/-/g, ' ')
      }))
    : []

  return (
    <WavyBackground>
      <Header />
      <div className="pt-20">
        {/* Cabeçalho da Categoria */}
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12">
          <div className="container">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Icone size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{infoCategoria.name}</h1>
                <p className="text-white/80">Encontre os melhores produtos para seu pet</p>
              </div>
            </div>
          </div>
        </section>

        {/* Produtos da Categoria */}
        <section className="py-12">
          <div className="container">
            {/* Filtros */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Funnel className="text-primary" size={24} />
                  Filtros
                </h2>
                <button 
                  onClick={() => setMostrarFiltros(!mostrarFiltros)}
                  className="md:hidden text-primary hover:text-primary-dark transition-colors"
                >
                  {mostrarFiltros ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              
              <div className={`grid grid-cols-1 md:grid-cols-5 gap-6 ${mostrarFiltros ? 'block' : 'hidden md:grid'}`}>
                {/* Filtro de Subcategoria */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-text flex items-center gap-2">
                    Subcategoria
                  </label>
                  <div className="relative group">
                    <select 
                      value={subcategoriaSelecionada}
                      onChange={(e) => {
                        setSubcategoriaSelecionada(e.target.value)
                        setSubsubcategoriaSelecionada('')
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer hover:border-primary text-text"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                    >
                      <option value="">Todas as subcategorias</option>
                      {subcategorias.map(sub => (
                        <option key={sub.value} value={sub.value} className="py-2">{sub.label}</option>
                      ))}
                    </select>
                    <div className="absolute right-0 top-0 h-full w-10 bg-primary rounded-r-xl flex items-center justify-center pointer-events-none group-hover:bg-primary-dark transition-colors">
                      <CaretDown 
                        size={16} 
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Filtro de Subsubcategoria - Só aparece se houver uma subcategoria selecionada */}
                {subcategoriaSelecionada && subsubcategorias.length > 0 && (
                  <div className="relative">
                    <label className="block text-sm font-medium mb-2 text-text flex items-center gap-2">
                      Tipo
                    </label>
                    <div className="relative group">
                      <select 
                        value={subsubcategoriaSelecionada}
                        onChange={(e) => setSubsubcategoriaSelecionada(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer hover:border-primary text-text"
                        style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                      >
                        <option value="">Todos os tipos</option>
                        {subsubcategorias.map(sub => (
                          <option key={sub.value} value={sub.value} className="py-2">{sub.label}</option>
                        ))}
                      </select>
                      <div className="absolute right-0 top-0 h-full w-10 bg-primary rounded-r-xl flex items-center justify-center pointer-events-none group-hover:bg-primary-dark transition-colors">
                        <CaretDown 
                          size={16} 
                          className="text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Filtro de Preço */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-text flex items-center gap-2">
                    Preço
                  </label>
                  <div className="relative group">
                    <select 
                      value={precoSelecionado}
                      onChange={(e) => setPrecoSelecionado(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer hover:border-primary text-text"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                    >
                      <option value="" className="py-2">Todos os preços</option>
                      <option value="0-50" className="py-2">Até R$ 50</option>
                      <option value="50-100" className="py-2">R$ 50 - R$ 100</option>
                      <option value="100-200" className="py-2">R$ 100 - R$ 200</option>
                      <option value="200+" className="py-2">Acima de R$ 200</option>
                    </select>
                    <div className="absolute right-0 top-0 h-full w-10 bg-primary rounded-r-xl flex items-center justify-center pointer-events-none group-hover:bg-primary-dark transition-colors">
                      <CaretDown 
                        size={16} 
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Filtro de Marca */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-text flex items-center gap-2">
                    Marca
                  </label>
                  <div className="relative group">
                    <select 
                      value={marcaSelecionada}
                      onChange={(e) => setMarcaSelecionada(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer hover:border-primary text-text"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                    >
                      <option value="" className="py-2">Todas as marcas</option>
                      {Array.from(new Set(produtosFiltrados.map(p => p.brand))).map(brand => (
                        <option key={brand} value={brand.toLowerCase()} className="py-2">{brand}</option>
                      ))}
                    </select>
                    <div className="absolute right-0 top-0 h-full w-10 bg-primary rounded-r-xl flex items-center justify-center pointer-events-none group-hover:bg-primary-dark transition-colors">
                      <CaretDown 
                        size={16} 
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Ordenação */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-text flex items-center gap-2">
                    Ordenar por
                  </label>
                  <div className="relative group">
                    <select 
                      value={ordenacao}
                      onChange={(e) => setOrdenacao(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer hover:border-primary text-text"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                    >
                      <option value="relevancia" className="py-2">Relevância</option>
                      <option value="preco-menor" className="py-2">Menor preço</option>
                      <option value="preco-maior" className="py-2">Maior preço</option>
                      <option value="mais-vendidos" className="py-2">Mais vendidos</option>
                    </select>
                    <div className="absolute right-0 top-0 h-full w-10 bg-primary rounded-r-xl flex items-center justify-center pointer-events-none group-hover:bg-primary-dark transition-colors">
                      <CaretDown 
                        size={16} 
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Chips de Filtros Selecionados */}
              <div className="flex flex-wrap gap-2 mt-4">
                {subcategoriaSelecionada && (
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    Subcategoria: {infoCategoria.subcategories[subcategoriaSelecionada as keyof typeof infoCategoria.subcategories].name}
                    <button 
                      onClick={() => {
                        setSubcategoriaSelecionada('')
                        setSubsubcategoriaSelecionada('')
                      }}
                      className="hover:text-primary-dark"
                    >
                      ×
                    </button>
                  </div>
                )}
                {subsubcategoriaSelecionada && (
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    Tipo: {subsubcategoriaSelecionada.charAt(0).toUpperCase() + subsubcategoriaSelecionada.slice(1).replace(/-/g, ' ')}
                    <button 
                      onClick={() => setSubsubcategoriaSelecionada('')}
                      className="hover:text-primary-dark"
                    >
                      ×
                    </button>
                  </div>
                )}
                {precoSelecionado && (
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    Preço: {
                      precoSelecionado === '0-50' ? 'Até R$ 50' :
                      precoSelecionado === '50-100' ? 'R$ 50 - R$ 100' :
                      precoSelecionado === '100-200' ? 'R$ 100 - R$ 200' :
                      'Acima de R$ 200'
                    }
                    <button 
                      onClick={() => setPrecoSelecionado('')}
                      className="hover:text-primary-dark"
                    >
                      ×
                    </button>
                  </div>
                )}
                {marcaSelecionada && (
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    Marca: {marcaSelecionada.charAt(0).toUpperCase() + marcaSelecionada.slice(1)}
                    <button 
                      onClick={() => setMarcaSelecionada('')}
                      className="hover:text-primary-dark"
                    >
                      ×
                    </button>
                  </div>
                )}
                {ordenacao && (
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    Ordenado por: {
                      ordenacao === 'preco-menor' ? 'Menor preço' :
                      ordenacao === 'preco-maior' ? 'Maior preço' :
                      ordenacao === 'mais-vendidos' ? 'Mais vendidos' :
                      'Relevância'
                    }
                    <button 
                      onClick={() => setOrdenacao('')}
                      className="hover:text-primary-dark"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Lista de Produtos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {produtosFiltrados.map((produto) => (
                <div key={produto.id} className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative aspect-square mb-4 rounded-xl overflow-hidden">
                    <Image
                      src={produto.image}
                      alt={produto.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2 line-clamp-2">{produto.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-400 mb-2">
                      <Star weight="fill" size={16} />
                      <span className="text-sm text-text">{produto.rating}</span>
                      <span className="text-sm text-text/60">({produto.reviewCount} avaliações)</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-primary">
                        R$ {produto.price.toFixed(2)}
                      </span>
                      {produto.compareAtPrice && (
                        <span className="text-sm text-text/60 line-through">
                          R$ {produto.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button className="w-full bg-primary text-white py-2 rounded-xl hover:bg-primary-dark transition-colors">
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mensagem quando não há produtos */}
            {produtosFiltrados.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-text/60">Nenhum produto encontrado</h3>
                <p className="text-text/40 mt-2">Tente ajustar os filtros para encontrar o que procura</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </WavyBackground>
  )
} 