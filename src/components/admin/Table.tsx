interface Column<T> {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  align?: 'left' | 'center' | 'right'
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowClick?: (item: T) => void
  isLoading?: boolean
  emptyMessage?: string
}

export function Table<T>({
  data,
  columns,
  onRowClick,
  isLoading = false,
  emptyMessage = 'Nenhum item encontrado'
}: TableProps<T>) {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200" />
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-16 border-t border-gray-200">
              <div className="grid grid-cols-4 gap-4 p-4">
                {columns.map((_, colIndex) => (
                  <div key={colIndex} className="h-4 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`
                  px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider
                  ${alignments[column.align || 'left']}
                `}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(item)}
              className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
            >
              {columns.map((column, colIndex) => {
                const value = typeof column.accessor === 'function'
                  ? column.accessor(item)
                  : item[column.accessor]

                return (
                  <td
                    key={colIndex}
                    className={`
                      px-6 py-4 whitespace-nowrap text-sm text-gray-900
                      ${alignments[column.align || 'left']}
                    `}
                  >
                    {value}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 