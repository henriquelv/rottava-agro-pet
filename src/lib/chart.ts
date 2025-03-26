import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Cores do tema
export const colors = {
  primary: {
    main: 'rgba(59, 130, 246, 1)', // blue-500
    light: 'rgba(59, 130, 246, 0.1)'
  },
  success: {
    main: 'rgba(34, 197, 94, 1)', // green-500
    light: 'rgba(34, 197, 94, 0.1)'
  },
  warning: {
    main: 'rgba(245, 158, 11, 1)', // amber-500
    light: 'rgba(245, 158, 11, 0.1)'
  },
  error: {
    main: 'rgba(239, 68, 68, 1)', // red-500
    light: 'rgba(239, 68, 68, 0.1)'
  },
  text: {
    400: 'rgba(148, 163, 184, 1)', // slate-400
    500: 'rgba(100, 116, 139, 1)' // slate-500
  }
}

// Opções padrão para os gráficos
export const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        font: {
          family: 'Inter'
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          family: 'Inter'
        }
      }
    },
    y: {
      grid: {
        color: 'rgba(226, 232, 240, 0.5)' // slate-200
      },
      ticks: {
        font: {
          family: 'Inter'
        }
      }
    }
  }
} 