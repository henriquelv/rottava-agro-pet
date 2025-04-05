import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let sequelize: Sequelize;

const createConnection = () => {
  if (typeof window === 'undefined') {
    // Código que só roda no servidor
    return new Sequelize(process.env.DATABASE_URL || '', {
      dialect: 'postgres',
      dialectModule: require('pg'),
      dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
          require: true,
          rejectUnauthorized: false
        } : false
      },
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      define: {
        timestamps: true,
        underscored: true,
        paranoid: true // Soft delete
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
        evict: 1000
      },
      retry: {
        max: 3,
        match: [
          /SequelizeConnectionError/,
          /SequelizeConnectionRefusedError/,
          /SequelizeHostNotFoundError/,
          /SequelizeHostNotReachableError/,
          /SequelizeInvalidConnectionError/,
          /SequelizeConnectionTimedOutError/
        ]
      }
    });
  } else {
    // Código que roda no cliente
    return new Sequelize('', {
      dialect: 'postgres',
      logging: false,
    });
  }
};

// Singleton pattern para garantir uma única instância da conexão
const getConnection = () => {
  if (!sequelize) {
    sequelize = createConnection();
  }
  return sequelize;
};

export const connect = async () => {
  try {
    const sequelize = getConnection();
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Sincronizar modelos com o banco de dados em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Modelos sincronizados com o banco de dados.');
    }
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    throw error;
  }
};

export const disconnect = async () => {
  try {
    if (sequelize) {
      await sequelize.close();
      console.log('Conexão com o banco de dados encerrada com sucesso.');
      sequelize = null;
    }
  } catch (error) {
    console.error('Erro ao encerrar conexão com o banco de dados:', error);
    throw error;
  }
};

// Tratamento de erros global
process.on('unhandledRejection', (error) => {
  console.error('Erro não tratado na conexão com o banco:', error);
  disconnect().catch(console.error);
});

export default getConnection(); 