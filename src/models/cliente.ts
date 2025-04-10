export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  data_cadastro: string;
  ultima_compra?: string;
  total_compras: number;
  status: 'ativo' | 'bloqueado';
} 