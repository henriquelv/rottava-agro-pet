import sequelize from './config';
import { Product, Category, Image } from './models';
import bcrypt from 'bcryptjs';
import User from './models/User';
import fs from 'fs';
import path from 'path';

interface ProductData {
  codigo: string;
  nome: string;
  slug?: string;
  categoria: string;
  descricao: string;
  preco: number;
  precoPromocional?: number | null;
  estoque?: number;
  estoqueMinimo?: number;
  imagens?: string[];
}

async function seed() {
  try {
    // Sincroniza os modelos com o banco de dados
    await sequelize.sync({ force: true });

    // Cria o usuário admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Administrador',
      email: 'admin@rottavaagropet.com.br',
      password: hashedPassword,
      role: 'admin'
    });

    // Cria as categorias padrão
    const categories = await Category.bulkCreate([
      { nome: 'Cães', slug: 'cao', descricao: 'Produtos para cães' },
      { nome: 'Gatos', slug: 'gato', descricao: 'Produtos para gatos' },
      { nome: 'Aves', slug: 'ave', descricao: 'Produtos para aves' },
      { nome: 'Peixes', slug: 'peixe', descricao: 'Produtos para peixes' },
      { nome: 'Cavalos', slug: 'cavalo', descricao: 'Produtos para cavalos' },
      { nome: 'Acessórios', slug: 'acessorios', descricao: 'Acessórios para pets' }
    ]);

    // Lê o arquivo de produtos
    const productsFile = path.join(process.cwd(), 'data', 'produtos.json');
    if (fs.existsSync(productsFile)) {
      const productsData = JSON.parse(fs.readFileSync(productsFile, 'utf-8')) as ProductData[];
      
      // Mapeia os produtos para o formato do banco
      const products = await Promise.all(productsData.map(async (product) => {
        const category = categories.find(c => (c.toJSON() as any).slug === product.categoria) || categories[0];
        const createdProduct = await Product.create({
          codigo: product.codigo,
          nome: product.nome,
          slug: product.slug || product.nome.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          descricao: product.descricao,
          preco: product.preco,
          precoPromocional: product.precoPromocional,
          estoque: product.estoque || 0,
          estoqueMinimo: product.estoqueMinimo || 5,
          categoryId: (category.toJSON() as any).id
        });

        // Cria as imagens do produto
        if (product.imagens && product.imagens.length > 0) {
          await Image.bulkCreate(
            product.imagens.map(url => ({
              url,
              productId: (createdProduct.toJSON() as any).id
            }))
          );
        }

        return createdProduct;
      }));

      console.log(`🟢 ${products.length} produtos importados com sucesso!`);
    }

    console.log('🟢 Banco de dados sincronizado e dados iniciais importados com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('🔴 Erro ao importar dados:', error);
    process.exit(1);
  }
}

seed(); 