import { api as axios } from '@/lib/axios'

// Tipos
export interface Product {
  id: string
  name: string
  price: number
  quantity: number
  minQuantity: number
  category: string
  createdAt: string
}

export interface Sale {
  id: string
  productId: string
  quantity: number
  value: number
  date: string
  sellerId: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
}

export interface Seller {
  id: string
  name: string
  email: string
  goal: number
  sales: number
  value: number
}

export interface Bill {
  id: string
  type: 'receivable' | 'payable'
  description: string
  value: number
  dueDate: string
  status: 'pending' | 'paid' | 'overdue'
  category?: string
  customerId?: string
  supplierId?: string
}

// Funções da API
export const api = {
  // Produtos
  async getProducts(): Promise<Product[]> {
    const response = await axios.get('/products')
    return response.data
  },

  async createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const response = await axios.post('/products', product)
    return response.data
  },

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const response = await axios.put(`/products/${id}`, product)
    return response.data
  },

  async deleteProduct(id: string): Promise<void> {
    await axios.delete(`/products/${id}`)
  },

  // Vendas
  async getSales(filters?: {
    startDate?: string
    endDate?: string
    sellerId?: string
    category?: string
  }): Promise<Sale[]> {
    const response = await axios.get('/sales', { params: filters })
    return response.data
  },

  async createSale(sale: Omit<Sale, 'id'>): Promise<Sale> {
    const response = await axios.post('/sales', sale)
    return response.data
  },

  // Clientes
  async getCustomers(): Promise<Customer[]> {
    const response = await axios.get('/customers')
    return response.data
  },

  async createCustomer(customer: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer> {
    const response = await axios.post('/customers', customer)
    return response.data
  },

  // Vendedores
  async getSellers(): Promise<Seller[]> {
    const response = await axios.get('/sellers')
    return response.data
  },

  async updateSellerGoal(id: string, goal: number): Promise<Seller> {
    const response = await axios.patch(`/sellers/${id}/goal`, { goal })
    return response.data
  },

  // Contas
  async getBills(type: 'receivable' | 'payable'): Promise<Bill[]> {
    const response = await axios.get(`/bills/${type}`)
    return response.data
  },

  async createBill(bill: Omit<Bill, 'id'>): Promise<Bill> {
    const response = await axios.post('/bills', bill)
    return response.data
  },

  async updateBillStatus(id: string, status: Bill['status']): Promise<Bill> {
    const response = await axios.patch(`/bills/${id}/status`, { status })
    return response.data
  },

  // Relatórios
  async exportReport(format: 'pdf' | 'excel' | 'csv', data: any): Promise<Blob> {
    const response = await axios.post(`/reports/export/${format}`, data, {
      responseType: 'blob'
    })
    return response.data
  },

  // Dashboard
  async getDashboardData(filters?: {
    period?: string
    category?: string
  }): Promise<{
    revenue: {
      current: number
      previous: number
    }
    sales: {
      current: number
      previous: number
    }
    customers: {
      current: number
      previous: number
    }
    stock: {
      lowStock: number
      total: number
    }
    topProducts: Product[]
    stockAlerts: Product[]
  }> {
    const response = await axios.get('/dashboard', { params: filters })
    return response.data
  }
} 