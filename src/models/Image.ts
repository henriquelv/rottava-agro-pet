import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Image extends Model {
  public id!: string;
  public url!: string;
  public produtoId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Image.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    produtoId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Image',
    tableName: 'images',
  }
);

export default Image; 