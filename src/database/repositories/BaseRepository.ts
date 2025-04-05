import { Model, ModelStatic } from 'sequelize';
import { withTransaction } from '../transaction';

export abstract class BaseRepository<T extends Model> {
  protected model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async findAll(options: any = {}): Promise<T[]> {
    return this.model.findAll(options);
  }

  async findById(id: string, options: any = {}): Promise<T | null> {
    return this.model.findByPk(id, options);
  }

  async create(data: any, options: any = {}): Promise<T> {
    return withTransaction(async (transaction) => {
      return this.model.create(data, { ...options, transaction });
    });
  }

  async update(id: string, data: any, options: any = {}): Promise<[number, T[]]> {
    return withTransaction(async (transaction) => {
      return this.model.update(data, {
        where: { id },
        ...options,
        transaction,
        returning: true,
      });
    });
  }

  async delete(id: string, options: any = {}): Promise<number> {
    return withTransaction(async (transaction) => {
      return this.model.destroy({
        where: { id },
        ...options,
        transaction,
      });
    });
  }
} 