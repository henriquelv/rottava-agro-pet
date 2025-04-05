import { Transaction } from 'sequelize';
import sequelize from './connection';

export const withTransaction = async <T>(
  callback: (transaction: Transaction) => Promise<T>
): Promise<T> => {
  const transaction = await sequelize.transaction();

  try {
    const result = await callback(transaction);
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}; 