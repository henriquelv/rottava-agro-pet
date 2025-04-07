import { logInfo, logError } from './logger'
import { addToQueue } from './queue'
import { addSchema } from './api-docs'

// Configuração do sistema de relatórios
const config = {
  outputPath: process.env.REPORT_OUTPUT_PATH || 'reports',
  formats: {
    pdf: {
      enabled: true,
      options: {
        format: 'A4',
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm',
        },
      },
    },
    excel: {
      enabled: true,
      options: {
        sheetName: 'Relatório',
        freezeColumns: 1,
      },
    },
    csv: {
      enabled: true,
      options: {
        delimiter: ',',
        encoding: 'utf-8',
      },
    },
  },
  defaultFormat: 'pdf',
  defaultTimezone: 'America/Sao_Paulo',
  maxRows: 100000,
  maxFileSize: 50 * 1024 * 1024, // 50MB
  retentionDays: 30,
}

// Tipos e interfaces
export type ReportFormat = keyof typeof config.formats

export interface ReportData {
  title: string
  description?: string
  columns: string[]
  rows: any[][]
  filters?: Record<string, any>
  groupBy?: string[]
  sortBy?: string[]
  timezone?: string
}

export interface ReportResponse {
  id: string
  status: 'generated' | 'failed'
  format: ReportFormat
  filePath: string
  size: number
  generatedAt: Date
}

// Classe de relatórios
export class Report {
  // Funções de relatórios
  async generateReport(data: ReportData, format: ReportFormat = config.defaultFormat): Promise<ReportResponse> {
    try {
      this.validateData(data)
      this.validateFormat(format)

      const response = await this.generateWithFormat(data, format)

      // Adiciona job para notificar geração
      await addToQueue('notification', {
        type: 'report_generated',
        data: {
          reportId: response.id,
          title: data.title,
          format: response.format,
          filePath: response.filePath,
        },
      })

      return response
    } catch (error) {
      logError('Report generation failed', { error, data, format })
      throw error
    }
  }

  // Funções auxiliares
  private validateData(data: ReportData): void {
    if (!data.title) {
      throw new Error('Título não especificado')
    }

    if (!data.columns || data.columns.length === 0) {
      throw new Error('Colunas não especificadas')
    }

    if (!data.rows || data.rows.length === 0) {
      throw new Error('Dados não especificados')
    }

    if (data.rows.length > config.maxRows) {
      throw new Error(`Número de linhas excede o limite de ${config.maxRows}`)
    }

    if (data.groupBy) {
      for (const column of data.groupBy) {
        if (!data.columns.includes(column)) {
          throw new Error(`Coluna de agrupamento inválida: ${column}`)
        }
      }
    }

    if (data.sortBy) {
      for (const column of data.sortBy) {
        if (!data.columns.includes(column)) {
          throw new Error(`Coluna de ordenação inválida: ${column}`)
        }
      }
    }
  }

  private validateFormat(format: ReportFormat): void {
    if (!config.formats[format]) {
      throw new Error(`Formato inválido: ${format}`)
    }

    if (!config.formats[format].enabled) {
      throw new Error(`Formato desabilitado: ${format}`)
    }
  }

  private async generateWithFormat(data: ReportData, format: ReportFormat): Promise<ReportResponse> {
    // Implementação real iria gerar o relatório no formato escolhido
    return {
      id: '1',
      status: 'generated',
      format,
      filePath: `${config.outputPath}/${data.title.toLowerCase().replace(/\s+/g, '-')}.${format}`,
      size: 1024,
      generatedAt: new Date(),
    }
  }

  // Funções de configuração
  updateConfig(newConfig: Partial<typeof config>) {
    Object.assign(config, newConfig)
    logInfo('Report config updated', { config })
  }

  getConfig() {
    return { ...config }
  }
}

// Instância padrão
export const report = new Report()

// Funções de conveniência
export async function generateReport(
  data: ReportData,
  format: ReportFormat = config.defaultFormat
): Promise<ReportResponse> {
  return report.generateReport(data, format)
}

// Adiciona schemas para documentação
addSchema('ReportData', {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    columns: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    rows: {
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'any',
        },
      },
    },
    filters: {
      type: 'object',
      additionalProperties: true,
    },
    groupBy: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    sortBy: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    timezone: {
      type: 'string',
    },
  },
  required: ['title', 'columns', 'rows'],
})

addSchema('ReportResponse', {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: ['generated', 'failed'],
    },
    format: {
      type: 'string',
      enum: Object.keys(config.formats),
    },
    filePath: {
      type: 'string',
    },
    size: {
      type: 'integer',
      minimum: 0,
    },
    generatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['id', 'status', 'format', 'filePath', 'size', 'generatedAt'],
}) 