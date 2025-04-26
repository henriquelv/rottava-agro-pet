import { useEffect } from 'react'
import { CheckCircle, Warning, X, Info } from 'lucide-react'

interface NotificationProps {
  type: 'success' | 'error' | 'info'
  title: string
  message: string
  onClose: () => void
  duration?: number
}

export function Notification({
  type,
  title,
  message,
  onClose,
  duration = 5000
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle size={24} className="text-green-500" />,
    error: <Warning size={24} className="text-red-500" />,
    info: <Info size={24} className="text-blue-500" />
  }

  const backgrounds = {
    success: 'bg-green-50',
    error: 'bg-red-50',
    info: 'bg-blue-50'
  }

  const borders = {
    success: 'border-green-500',
    error: 'border-red-500',
    info: 'border-blue-500'
  }

  return (
    <div className={`fixed top-4 right-4 w-96 p-4 rounded-lg shadow-lg border-l-4 ${backgrounds[type]} ${borders[type]} animate-slide-in`}>
      <div className="flex items-start gap-3">
        {icons[type]}
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-600">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  )
} 