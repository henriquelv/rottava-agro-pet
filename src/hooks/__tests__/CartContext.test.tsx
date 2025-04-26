import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '../CartContext'

describe('CartContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  )

  beforeEach(() => {
    localStorage.clear()
  })

  it('deve inicializar com carrinho vazio', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toEqual([])
    expect(result.current.total).toBe(0)
  })

  it('deve adicionar item ao carrinho', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addItem({
        id: '1',
        nome: 'Produto Teste',
        preco: 100,
        precoPromocional: 90,
        imagem: 'teste.jpg',
        quantidade: 1
      })
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].nome).toBe('Produto Teste')
    expect(result.current.total).toBe(90)
  })

  it('deve remover item do carrinho', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addItem({
        id: '1',
        nome: 'Produto Teste',
        preco: 100,
        precoPromocional: 90,
        imagem: 'teste.jpg',
        quantidade: 1
      })
    })

    act(() => {
      result.current.removeItem('1')
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.total).toBe(0)
  })

  it('deve atualizar quantidade do item', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addItem({
        id: '1',
        nome: 'Produto Teste',
        preco: 100,
        precoPromocional: 90,
        imagem: 'teste.jpg',
        quantidade: 1
      })
    })

    act(() => {
      result.current.updateQuantity('1', 3)
    })

    expect(result.current.items[0].quantidade).toBe(3)
    expect(result.current.total).toBe(270)
  })

  it('deve limpar o carrinho', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addItem({
        id: '1',
        nome: 'Produto Teste',
        preco: 100,
        precoPromocional: 90,
        imagem: 'teste.jpg',
        quantidade: 1
      })
    })

    act(() => {
      result.current.clearCart()
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.total).toBe(0)
  })

  it('deve persistir dados no localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addItem({
        id: '1',
        nome: 'Produto Teste',
        preco: 100,
        precoPromocional: 90,
        imagem: 'teste.jpg',
        quantidade: 1
      })
    })

    const storedData = localStorage.getItem('cart')
    expect(storedData).toBeTruthy()
    expect(JSON.parse(storedData || '[]')).toHaveLength(1)
  })
}) 