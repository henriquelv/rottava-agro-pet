export interface Produto {
  id: string;
  nome: string;
  preco: number;
  preco_promocional?: number;
  em_promocao: boolean;
  descricao: string;
  imagem_url: string;
  quantidade_disponivel: number;
  categoria: string;
  marca: string;
  ativo: boolean;
  visivel: boolean;
  data_criacao: string;
  data_atualizacao: string;
}

export interface MovimentacaoEstoque {
  id: string;
  produto_id: string;
  tipo: 'entrada' | 'saida';
  quantidade: number;
  quantidade_anterior: number;
  quantidade_nova: number;
  motivo: string;
  usuario_id: string;
  data: string;
}

export interface Categoria {
  id: string;
  nome: string;
  slug: string;
}

export interface Marca {
  id: string;
  nome: string;
  slug: string;
} 