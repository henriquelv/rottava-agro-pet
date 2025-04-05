import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Product extends Model {
  public id!: string;
  public nome!: string;
  public slug!: string;
  public codigo!: string;
  public descricao!: string;
  public descricaoDetalhada!: string | null;
  public preco!: number;
  public precoPromocional!: number | null;
  public disponivel!: boolean;
  public categoriaId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descricaoDetalhada: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    precoPromocional: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    disponivel: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    categoriaId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
  }
);

export default Product; 