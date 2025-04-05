import sequelize from './config';
import './models';

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('🟢 Banco sincronizado com Sequelize.');
    process.exit(0);
  } catch (error) {
    console.error('🔴 Erro ao sincronizar banco:', error);
    process.exit(1);
  }
})(); 