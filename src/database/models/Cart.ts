import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
    get() {
      const rawValue = this.getDataValue('items');
      return rawValue ? JSON.parse(JSON.stringify(rawValue)) : [];
    }
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'carts',
  timestamps: true,
  underscored: true,
  hooks: {
    beforeSave: async (cart) => {
      if (cart.changed('items')) {
        // Recalcular o total quando os itens são alterados
        const items = cart.get('items');
        const total = items.reduce((acc, item) => {
          return acc + (item.price * item.quantity);
        }, 0);
        cart.set('total', total);
      }
    }
  }
});

// Associações
Cart.associate = (models) => {
  Cart.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
  });
};

export default Cart; 