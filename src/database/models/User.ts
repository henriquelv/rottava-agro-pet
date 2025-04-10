import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';
import { Cart } from './Cart';
import { Order } from './Order';
import { Favorite } from './Favorite';

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
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
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: 'admin' | 'user';
  public phone!: string;
  public address!: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  public preferences!: {
    notifications: boolean;
    newsletter: boolean;
    marketing: boolean;
  };
  public lastLoginAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // Associações
  public cart?: Cart;
  public orders?: Order[];
  public favorites?: Favorite[];
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user',
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    preferences: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        notifications: true,
        newsletter: true,
        marketing: true,
      },
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    paranoid: true, // Habilita soft delete
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
  }
);

// As associações serão definidas no arquivo index.ts para evitar referências circulares

export { User }; 