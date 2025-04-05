import { BaseRepository } from './BaseRepository';
import { Order } from '../models/Order';

export class OrderRepository extends BaseRepository<Order> {
  constructor() {
    super(Order);
  }

  async findByUser(userId: string): Promise<Order[]> {
    return this.model.findAll({
      where: { userId },
      include: [
        {
          association: 'items',
          include: ['product'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async findByStatus(status: string): Promise<Order[]> {
    return this.model.findAll({
      where: { status },
      include: [
        {
          association: 'items',
          include: ['product'],
        },
        'user',
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async updateStatus(id: string, status: string): Promise<[number, Order[]]> {
    return this.update(id, { status });
  }
} 