export interface ItemPedido {
  produto_id: string;
  produto_nome: string;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
}

export interface Pedido {
  id: string;
  cliente_id: string;
  cliente_nome: string;
  cliente_email: string;
  cliente_telefone: string;
  itens: ItemPedido[];
  valor_total: number;
  status: 'pendente' | 'aprovado' | 'enviado' | 'entregue' | 'cancelado';
  codigo_rastreio?: string;
  metodo_pagamento: string;
  data_criacao: string;
  data_atualizacao: string;
  endereco_entrega?: {
    endereco: string;
    cidade: string;
    estado: string;
    cep: string;
  };
} 