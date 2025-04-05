import { BaseRepository } from './BaseRepository';
import Category from '../models/Category';

export class CategoryRepository extends BaseRepository<Category> {
  constructor() {
    super(Category);
  }

  async findBySlug(slug: string): Promise<Category | null> {
    return this.model.findOne({ where: { slug } });
  }

  async findWithProducts(): Promise<Category[]> {
    return this.model.findAll({
      include: [
        {
          association: 'products',
          include: ['imagens'],
        },
      ],
    });
  }
} 