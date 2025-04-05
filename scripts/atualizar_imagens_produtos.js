require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');
const slugify = require('slugify');

// Configurar conexão com o banco de dados
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false
});

// Definir modelo Product
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    preco_promocional: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    estoque_minimo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'products',
    underscored: true
});

async function atualizarImagensProdutos() {
    try {
        // Carregar produtos do banco de dados
        const produtos = await Product.findAll();
        console.log(`🔍 Encontrados ${produtos.length} produtos no banco de dados`);

        let atualizados = 0;
        let naoEncontrados = 0;

        for (const produto of produtos) {
            // Criar slug do nome do produto para buscar a imagem
            const slug = slugify(produto.nome, {
                lower: true,
                strict: true,
                remove: /[*+~.()'"!:@]/g
            });

            // Caminho da imagem
            const nomeArquivo = `${slug}.jpg`;
            const caminhoImagem = path.join('imagens_produtos', nomeArquivo);

            // Verificar se a imagem existe
            if (fs.existsSync(caminhoImagem)) {
                // Atualizar o produto com o caminho da imagem
                await produto.update({
                    imagem: nomeArquivo
                });
                console.log(`✅ Imagem atualizada para: ${produto.nome}`);
                atualizados++;
            } else {
                console.log(`❌ Imagem não encontrada para: ${produto.nome}`);
                naoEncontrados++;
            }
        }

        console.log('\n📊 Estatísticas:');
        console.log(`✅ ${atualizados} produtos atualizados com imagens`);
        console.log(`❌ ${naoEncontrados} produtos sem imagens encontradas`);
        console.log(`🏁 Total: ${produtos.length} produtos processados`);

    } catch (error) {
        console.error('Erro ao atualizar imagens:', error);
    } finally {
        await sequelize.close();
    }
}

console.log('🚀 Iniciando atualização de imagens dos produtos...');
atualizarImagensProdutos().then(() => {
    console.log('✅ Processo concluído!');
}); 