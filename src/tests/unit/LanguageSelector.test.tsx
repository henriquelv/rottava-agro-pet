import { render, screen, fireEvent } from '@testing-library/react'
import LanguageSelector from '@/components/ui/LanguageSelector'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n/config'

describe('LanguageSelector', () => {
  it('should render language selector button', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    )
    
    expect(screen.getByLabelText('Selecionar idioma')).toBeInTheDocument()
  })

  it('should show language options on hover', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    )
    
    const button = screen.getByLabelText('Selecionar idioma')
    fireEvent.mouseEnter(button)
    
    expect(screen.getByText('Português')).toBeInTheDocument()
    expect(screen.getByText('English')).toBeInTheDocument()
  })

  it('should change language when clicking options', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    )
    
    const button = screen.getByLabelText('Selecionar idioma')
    fireEvent.mouseEnter(button)
    
    const englishButton = screen.getByText('English')
    fireEvent.click(englishButton)
    
    expect(i18n.language).toBe('en-US')
    
    const portugueseButton = screen.getByText('Português')
    fireEvent.click(portugueseButton)
    
    expect(i18n.language).toBe('pt-BR')
  })

  it('should show current language in button', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    )
    
    const button = screen.getByLabelText('Selecionar idioma')
    expect(button.textContent).toContain('Português')
    
    fireEvent.mouseEnter(button)
    fireEvent.click(screen.getByText('English'))
    
    expect(button.textContent).toContain('English')
  })
}) 