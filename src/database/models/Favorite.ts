import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';

const Favorite = sequelize.define('Favorite', {
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
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  }
}, {
  tableName: 'favorites',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'product_id']
    }
  ]
});

// Associações
Favorite.associate = (models) => {
  Favorite.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
  });

  Favorite.belongsTo(models.Product, {
    foreignKey: 'productId',
    as: 'product'
  });
};

export default Favorite; 