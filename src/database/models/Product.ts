import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  precoPromocional: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  promocaoTipo: {
    type: DataTypes.ENUM('tempo', 'quantidade'),
    allowNull: true,
  },
  promocaoExpiracao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  promocaoQuantidadeMaxima: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  promocaoQuantidadeVendida: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  estoqueMinimo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5,
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id',
    },
  },
}, {
  tableName: 'products',
  timestamps: true,
});

export default Product; 