require('dotenv').config({ path: '.env' });
const { Sequelize } = require('sequelize');

// Conectar ao banco de dados
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

async function verificarEstrutura() {
  try {
    // Verificar conexão com o banco
    await sequelize.authenticate();
    console.log('🟢 Conexão com o banco de dados estabelecida.\n');
    
    // Verificar tabelas existentes
    const [results] = await sequelize.query(`
      SELECT 
        t.table_name, 
        c.column_name, 
        c.data_type,
        c.is_nullable
      FROM 
        information_schema.tables t
      JOIN 
        information_schema.columns c 
        ON t.table_name = c.table_name
      WHERE 
        t.table_schema = 'public'
        AND t.table_type = 'BASE TABLE'
      ORDER BY 
        t.table_name, 
        c.ordinal_position;
    `);
    
    // Organizar resultados por tabela
    const tabelas = {};
    results.forEach(row => {
      if (!tabelas[row.table_name]) {
        tabelas[row.table_name] = [];
      }
      tabelas[row.table_name].push({
        coluna: row.column_name,
        tipo: row.data_type,
        nullable: row.is_nullable === 'YES' ? true : false
      });
    });
    
    // Mostrar estrutura de cada tabela
    console.log('📊 Estrutura das tabelas:\n');
    Object.keys(tabelas).sort().forEach(tabela => {
      console.log(`📋 Tabela: ${tabela}`);
      console.log('------------------------');
      tabelas[tabela].forEach(coluna => {
        console.log(`  - ${coluna.coluna} (${coluna.tipo})${coluna.nullable ? ' - nullable' : ''}`);
      });
      console.log('');
    });
    
  } catch (error) {
    console.error('🔴 Erro ao verificar estrutura:', error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

verificarEstrutura(); 