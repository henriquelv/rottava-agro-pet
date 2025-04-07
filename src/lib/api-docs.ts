import { logInfo, logError } from './logger'
import { OpenAPIV3 } from 'openapi-types'
import { writeFile } from 'fs/promises'
import { join } from 'path'

// Configuração da documentação
const config = {
  title: 'Rottava Agro Pet API',
  version: '1.0.0',
  description: 'API para o sistema Rottava Agro Pet',
  basePath: '/api',
  outputPath: 'docs/openapi.json',
}

// Schema base
const baseSchema: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: config.title,
    version: config.version,
    description: config.description,
  },
  servers: [
    {
      url: process.env.API_URL || 'http://localhost:3000',
      description: 'Servidor de desenvolvimento',
    },
  ],
  paths: {},
  components: {
    schemas: {
      Error: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
          details: {
            type: 'object',
            additionalProperties: true,
          },
        },
        required: ['code', 'message'],
      },
    },
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
}

// Classe de documentação
export class ApiDocumentation {
  private schema: OpenAPIV3.Document = baseSchema

  // Funções para gerenciamento de endpoints
  addEndpoint(
    path: string,
    method: OpenAPIV3.HttpMethods,
    endpoint: OpenAPIV3.OperationObject
  ): void {
    try {
      if (!this.schema.paths[path]) {
        this.schema.paths[path] = {}
      }

      this.schema.paths[path]![method] = endpoint
      logInfo('Endpoint added to documentation', { path, method })
    } catch (error) {
      logError('Failed to add endpoint', { error, path, method })
      throw error
    }
  }

  addSchema(name: string, schema: OpenAPIV3.SchemaObject): void {
    try {
      this.schema.components!.schemas![name] = schema
      logInfo('Schema added to documentation', { name })
    } catch (error) {
      logError('Failed to add schema', { error, name })
      throw error
    }
  }

  // Funções para geração de documentação
  async generate(): Promise<void> {
    try {
      const outputPath = join(process.cwd(), config.outputPath)
      await writeFile(outputPath, JSON.stringify(this.schema, null, 2))
      logInfo('API documentation generated', { path: outputPath })
    } catch (error) {
      logError('Failed to generate documentation', { error })
      throw error
    }
  }

  // Funções de configuração
  updateConfig(newConfig: Partial<typeof config>) {
    Object.assign(config, newConfig)
    logInfo('API documentation config updated', { config })
  }

  getConfig() {
    return { ...config }
  }

  getSchema() {
    return { ...this.schema }
  }

  getEndpoints() {
    return { ...this.schema.paths }
  }
}

// Instância padrão
export const apiDocs = new ApiDocumentation()

// Funções de conveniência
export function addEndpoint(
  path: string,
  method: OpenAPIV3.HttpMethods,
  endpoint: OpenAPIV3.OperationObject
): void {
  apiDocs.addEndpoint(path, method, endpoint)
}

export function addSchema(name: string, schema: OpenAPIV3.SchemaObject): void {
  apiDocs.addSchema(name, schema)
}

export async function generateDocs(): Promise<void> {
  return apiDocs.generate()
}

// Exemplos de uso
export const exampleSchemas = {
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      name: {
        type: 'string',
      },
      email: {
        type: 'string',
        format: 'email',
      },
      role: {
        type: 'string',
        enum: ['user', 'admin'],
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
      },
    },
  },
  Product: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      name: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      price: {
        type: 'number',
        format: 'float',
      },
      promotionalPrice: {
        type: 'number',
        format: 'float',
      },
      stock: {
        type: 'integer',
      },
      image: {
        type: 'string',
        format: 'uri',
      },
      category: {
        type: 'string',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
      },
    },
  },
  Order: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      userId: {
        type: 'string',
        format: 'uuid',
      },
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            productId: {
              type: 'string',
              format: 'uuid',
            },
            quantity: {
              type: 'integer',
            },
            price: {
              type: 'number',
              format: 'float',
            },
          },
        },
      },
      total: {
        type: 'number',
        format: 'float',
      },
      status: {
        type: 'string',
        enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
      },
    },
  },
} 