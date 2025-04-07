import { render, screen, fireEvent } from '@testing-library/react'
import AccessibilityBar from '@/components/ui/AccessibilityBar'

describe('AccessibilityBar', () => {
  it('should render all accessibility buttons', () => {
    render(<AccessibilityBar />)
    
    expect(screen.getByLabelText('Diminuir tamanho da fonte')).toBeInTheDocument()
    expect(screen.getByLabelText('Tamanho normal da fonte')).toBeInTheDocument()
    expect(screen.getByLabelText('Aumentar tamanho da fonte')).toBeInTheDocument()
    expect(screen.getByLabelText('Alternar contraste')).toBeInTheDocument()
    expect(screen.getByLabelText('Alternar alto contraste')).toBeInTheDocument()
    expect(screen.getByLabelText('Alternar leitura de tela')).toBeInTheDocument()
  })

  it('should change font size when clicking buttons', () => {
    render(<AccessibilityBar />)
    
    const decreaseButton = screen.getByLabelText('Diminuir tamanho da fonte')
    const normalButton = screen.getByLabelText('Tamanho normal da fonte')
    const increaseButton = screen.getByLabelText('Aumentar tamanho da fonte')

    fireEvent.click(decreaseButton)
    expect(document.documentElement.style.fontSize).toBe('14px')

    fireEvent.click(normalButton)
    expect(document.documentElement.style.fontSize).toBe('16px')

    fireEvent.click(increaseButton)
    expect(document.documentElement.style.fontSize).toBe('18px')
  })

  it('should toggle contrast when clicking button', () => {
    render(<AccessibilityBar />)
    
    const contrastButton = screen.getByLabelText('Alternar contraste')
    
    fireEvent.click(contrastButton)
    expect(document.body.classList.contains('contrast')).toBe(true)
    
    fireEvent.click(contrastButton)
    expect(document.body.classList.contains('contrast')).toBe(false)
  })

  it('should toggle high contrast when clicking button', () => {
    render(<AccessibilityBar />)
    
    const highContrastButton = screen.getByLabelText('Alternar alto contraste')
    
    fireEvent.click(highContrastButton)
    expect(document.body.classList.contains('high-contrast')).toBe(true)
    
    fireEvent.click(highContrastButton)
    expect(document.body.classList.contains('high-contrast')).toBe(false)
  })

  it('should toggle screen reader when clicking button', () => {
    render(<AccessibilityBar />)
    
    const screenReaderButton = screen.getByLabelText('Alternar leitura de tela')
    
    fireEvent.click(screenReaderButton)
    expect(document.querySelectorAll('[aria-live]').length).toBeGreaterThan(0)
    
    fireEvent.click(screenReaderButton)
    expect(document.querySelectorAll('[aria-live]').length).toBe(0)
  })
}) 