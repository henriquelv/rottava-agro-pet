import { User, Cart, Order, Favorite } from '../models';
import { Transaction } from 'sequelize';
import sequelize from '../config';

interface UserData {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
  phone?: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    marketing: boolean;
  };
}

interface UpdateUserData extends Partial<UserData> {
  lastLoginAt?: Date;
}

export class UserRepository {
  async findByEmail(email: string) {
    return await User.findOne({
      where: { email },
      include: [
        {
          model: Cart,
          as: 'cart',
        }
      ]
    });
  }

  async findById(id: string) {
    return await User.findByPk(id, {
      include: [
        {
          model: Cart,
          as: 'cart',
        },
        {
          model: Order,
          as: 'orders',
        },
        {
          model: Favorite,
          as: 'favorites',
        }
      ]
    });
  }

  async create(data: UserData) {
    const transaction = await sequelize.transaction();
    try {
      const user = await User.create(data, { transaction });
      
      // Criar carrinho vazio para o usuário
      await Cart.create({
        userId: user.id,
        items: [],
        total: 0
      }, { transaction });

      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(id: string, data: UpdateUserData) {
    const transaction = await sequelize.transaction();
    try {
      const user = await User.findByPk(id, { transaction });
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const updatedUser = await user.update(data, { transaction });
      await transaction.commit();
      return updatedUser;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async delete(id: string) {
    const transaction = await sequelize.transaction();
    try {
      const user = await User.findByPk(id, { transaction });
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Soft delete
      await user.update({ deletedAt: new Date() }, { transaction });
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getOrCreateCart(userId: string) {
    const transaction = await sequelize.transaction();
    try {
      let cart = await Cart.findOne({
        where: { userId },
        transaction
      });

      if (!cart) {
        cart = await Cart.create({
          userId,
          items: [],
          total: 0
        }, { transaction });
      }

      await transaction.commit();
      return cart;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async saveCartState(userId: string) {
    const transaction = await sequelize.transaction();
    try {
      const cart = await Cart.findOne({
        where: { userId },
        transaction
      });

      if (cart) {
        // Salvar estado atual do carrinho
        await cart.update({
          updatedAt: new Date()
        }, { transaction });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getFavorites(userId: string) {
    return await Favorite.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name']
        }
      ]
    });
  }

  async addFavorite(userId: string, productId: string) {
    const transaction = await sequelize.transaction();
    try {
      const [favorite] = await Favorite.findOrCreate({
        where: { userId, productId },
        transaction
      });

      await transaction.commit();
      return favorite;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async removeFavorite(userId: string, productId: string) {
    const transaction = await sequelize.transaction();
    try {
      const result = await Favorite.destroy({
        where: { userId, productId },
        transaction
      });

      await transaction.commit();
      return result > 0;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
} 