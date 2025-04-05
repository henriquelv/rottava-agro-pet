import fs from 'fs';
import path from 'path';
import { connect, disconnect } from './connection';
import { QueryInterface } from 'sequelize';
import sequelize from './connection';

const migrationsDir = path.join(__dirname, 'migrations');

async function runMigrations() {
  try {
    await connect();

    // Verifica se a tabela de migrações existe
    const [results] = await sequelize.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'migrations')"
    );
    
    const migrationsTableExists = (results[0] as { exists: boolean }).exists;

    if (!migrationsTableExists) {
      // Cria a tabela de migrações se não existir
      await sequelize.query(`
        CREATE TABLE migrations (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    }

    // Lista todos os arquivos de migração
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.ts'))
      .sort();

    // Executa cada migração
    for (const file of files) {
      const [results] = await sequelize.query(
        'SELECT * FROM migrations WHERE name = $1',
        { bind: [file] }
      );

      if (results.length === 0) {
        console.log(`Executando migração: ${file}`);
        
        const migration = require(path.join(migrationsDir, file));
        await migration.up(sequelize.getQueryInterface() as QueryInterface);
        
        await sequelize.query(
          'INSERT INTO migrations (name) VALUES ($1)',
          { bind: [file] }
        );
        
        console.log(`Migração concluída: ${file}`);
      }
    }

    console.log('Todas as migrações foram executadas com sucesso!');
  } catch (error) {
    console.error('Erro ao executar migrações:', error);
  } finally {
    await disconnect();
  }
}

runMigrations(); 