import { BaseRepository } from './BaseRepository';
import Product from '../models/Product';
import { Op } from 'sequelize';

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(Product);
  }

  async findBySlug(slug: string): Promise<Product | null> {
    return this.model.findOne({
      where: { slug },
      include: ['imagens', 'categoria'],
    });
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    return this.model.findAll({
      where: { categoryId },
      include: ['imagens', 'categoria'],
    });
  }

  async findPromotional(): Promise<Product[]> {
    return this.model.findAll({
      where: {
        precoPromocional: {
          [Op.not]: null,
        },
      },
      include: ['imagens', 'categoria'],
    });
  }
} 