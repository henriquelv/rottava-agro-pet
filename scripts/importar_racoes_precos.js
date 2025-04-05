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
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
  }
}, {
  tableName: 'products',
  underscored: true,
});

// Função para importar os produtos
async function importProducts() {
  try {
    console.log('🟡 Iniciando atualização de preços dos produtos...');
    
    // Ler o arquivo JSON com preços corretos
    const jsonPath = path.join(__dirname, '..', 'racoes_corrigidas_preco_venda.json');
    const produtos = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    
    console.log(`🟡 Encontrados ${produtos.length} produtos para atualizar.`);
    
    // Verificar conexão com o banco
    await sequelize.authenticate();
    console.log('🟢 Conexão com o banco de dados estabelecida.');
    
    // Processar cada produto
    console.log('🟡 Atualizando preços...');
    let produtosAtualizados = 0;
    let produtosNaoEncontrados = 0;
    
    for (const produto of produtos) {
      // Verificar se o produto existe pelo código
      const produtoExistente = await Product.findOne({ 
        where: { codigo: String(produto.Código) } 
      });
      
      if (produtoExistente) {
        // Atualizar preço do produto existente
        await produtoExistente.update({
          preco: parseFloat(produto["Preço de Venda"] || 0)
        });
        produtosAtualizados++;
      } else {
        produtosNaoEncontrados++;
        console.log(`🔴 Produto não encontrado para o código: ${produto.Código} - ${produto.Produto}`);
      }
      
      // Feedback a cada 10 produtos
      if (produtosAtualizados > 0 && produtosAtualizados % 10 === 0) {
        console.log(`🟢 Atualizados ${produtosAtualizados} produtos...`);
      }
    }
    
    console.log(`
🟢 Atualização concluída!
✅ ${produtosAtualizados} produtos atualizados com sucesso
❌ ${produtosNaoEncontrados} produtos não encontrados no banco
✅ Total: ${produtosAtualizados + produtosNaoEncontrados} produtos processados
    `);
    
  } catch (error) {
    console.error('🔴 Erro durante a atualização dos preços:', error);
  } finally {
    // Fechar conexão
    await sequelize.close();
    process.exit(0);
  }
}

// Executar atualização
importProducts(); 