require('dotenv').config({ path: '.env' });
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const slugify = require('slugify');

// Conectar ao banco de dados
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  define: {
    underscored: true, // Isso faz com que as colunas sejam snake_case no banco
    timestamps: true
  }
});

// Definir modelos diretamente (para evitar problemas com importação)
const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'categories',
  underscored: true,
});

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  preco_promocional: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: 'preco_promocional'
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  estoque_minimo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5,
    field: 'estoque_minimo'
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'category_id'
  },
}, {
  tableName: 'products',
  underscored: true,
});

// Uso do modelo ProductImage ao invés de Image
const ProductImage = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alt: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isMain: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'ProductImage',
  timestamps: true,
});

// Função para gerar um slug único
const generateUniqueSlug = (name) => {
  return slugify(name, {
    lower: true,
    strict: true,
    locale: 'pt'
  });
};

// Função para importar os produtos
async function importProducts() {
  try {
    console.log('🟡 Iniciando importação de produtos...');
    
    // Ler o arquivo JSON
    const jsonPath = path.join(__dirname, '..', 'racoes_corrigidas.json');
    const produtos = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    
    console.log(`🟡 Encontrados ${produtos.length} produtos para importar.`);
    
    // Verificar conexão com o banco
    await sequelize.authenticate();
    console.log('🟢 Conexão com o banco de dados estabelecida.');
    
    // Mapear categorias existentes no arquivo
    const categoriasUnicas = [...new Set(produtos.map(p => p.Categoria.toLowerCase()))];
    console.log(`🟡 Categorias encontradas: ${categoriasUnicas.join(', ')}`);
    
    // Verificar categorias existentes no banco
    const categoriasExistentes = await Category.findAll();
    const categoriasNovas = [];
    
    // Criar categorias que não existem
    for (const categoria of categoriasUnicas) {
      const categoriaExiste = categoriasExistentes.some(
        c => c.nome.toLowerCase() === categoria || c.slug === slugify(categoria, { lower: true })
      );
      
      if (!categoriaExiste) {
        categoriasNovas.push({
          nome: categoria.charAt(0).toUpperCase() + categoria.slice(1),
          slug: slugify(categoria, { lower: true }),
          descricao: `Produtos para ${categoria}`
        });
      }
    }
    
    if (categoriasNovas.length > 0) {
      console.log(`🟡 Criando ${categoriasNovas.length} novas categorias...`);
      await Category.bulkCreate(categoriasNovas);
    }
    
    // Buscar todas as categorias (incluindo as recém-criadas)
    const todasCategorias = await Category.findAll();
    
    // Processar cada produto
    console.log('🟡 Importando produtos...');
    let produtosImportados = 0;
    let produtosAtualizados = 0;
    
    for (const produto of produtos) {
      // Converter o nome da categoria para slug para comparação
      const categoriaSlug = slugify(produto.Categoria.toLowerCase(), { lower: true });
      
      // Encontrar a categoria correta
      const categoria = todasCategorias.find(
        c => c.slug === categoriaSlug || c.nome.toLowerCase() === produto.Categoria.toLowerCase()
      );
      
      if (!categoria) {
        console.log(`🔴 Categoria não encontrada para o produto ${produto.Produto}`);
        continue;
      }
      
      const produtoSlug = generateUniqueSlug(produto.Produto);
      
      // Diretamente na tabela Product conforme a estrutura atual
      const produtoData = {
        codigo: String(produto.Código),
        nome: produto.Produto,
        slug: produtoSlug,
        descricao: produto.Descrição || `${produto.Produto} - produto de alta qualidade`,
        preco: parseFloat(produto.Custo || 0), // Usar preço diretamente da tabela
        estoque: 10,
        estoque_minimo: 2,
        category_id: categoria.id,
        imagem: `/images/produtos/${produtoSlug}.jpg` // Usando o campo imagem diretamente
      };
      
      // Verificar se o produto já existe pelo código
      let produtoExistente = await Product.findOne({ 
        where: { codigo: produtoData.codigo } 
      });
      
      // Se não encontrou pelo código, tenta pelo slug
      if (!produtoExistente) {
        produtoExistente = await Product.findOne({
          where: { slug: produtoData.slug }
        });
      }
      
      if (produtoExistente) {
        // Atualizar produto existente
        await produtoExistente.update(produtoData);
        produtosAtualizados++;
      } else {
        // Criar novo produto
        await Product.create(produtoData);
        produtosImportados++;
      }
      
      // Feedback a cada 10 produtos
      if ((produtosImportados + produtosAtualizados) % 10 === 0) {
        console.log(`🟢 Processados ${produtosImportados + produtosAtualizados} produtos...`);
      }
    }
    
    console.log(`
🟢 Importação concluída!
✅ ${produtosImportados} produtos novos importados 
✅ ${produtosAtualizados} produtos atualizados
✅ Total: ${produtosImportados + produtosAtualizados} produtos processados
    `);
    
  } catch (error) {
    console.error('🔴 Erro durante a importação:', error);
  } finally {
    // Fechar conexão
    await sequelize.close();
    process.exit(0);
  }
}

// Executar importação
importProducts(); 