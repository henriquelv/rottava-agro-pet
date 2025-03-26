import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CaretLeft, CaretRight } from 'phosphor-react'

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  // Não mostrar paginação se houver apenas uma página
  if (totalPages <= 1) return null

  // Gerar array de páginas a serem exibidas
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5 // Número máximo de páginas visíveis
    
    if (totalPages <= maxVisiblePages) {
      // Se o total de páginas for menor que o máximo, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Sempre mostrar a primeira página
      pages.push(1)
      
      if (currentPage <= 3) {
        // Se estiver nas primeiras páginas
        for (let i = 2; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Se estiver nas últimas páginas
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Se estiver no meio
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Botão Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          p-2 rounded-lg transition-colors
          ${currentPage === 1
            ? 'text-text/20 cursor-not-allowed'
            : 'text-text hover:bg-gray-100'
          }
        `}
      >
        <CaretLeft size={20} />
      </button>

      {/* Números das Páginas */}
      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-2">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`
                min-w-[40px] h-10 flex items-center justify-center rounded-lg transition-colors
                ${currentPage === page
                  ? 'bg-primary text-white'
                  : 'text-text hover:bg-gray-100'
                }
              `}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Botão Próximo */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          p-2 rounded-lg transition-colors
          ${currentPage === totalPages
            ? 'text-text/20 cursor-not-allowed'
            : 'text-text hover:bg-gray-100'
          }
        `}
      >
        <CaretRight size={20} />
      </button>
    </div>
  )
} 