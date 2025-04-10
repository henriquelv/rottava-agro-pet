import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

interface OrderItem extends CartItem {
  productSnapshot: {
    name: string;
    description: string;
    price: number;
    image?: string;
  };
}

interface OrderAttributes {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentMethod: 'credit_card' | 'debit_card' | 'pix' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  shippingMethod: string;
  shippingCost: number;
  shippingStatus: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingCode?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  cancelledAt?: Date;
  completedAt?: Date;
}

class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: string;
  public userId!: string;
  public items!: OrderItem[];
  public total!: number;
  public status!: 'pending' | 'processing' | 'completed' | 'cancelled';
  public paymentMethod!: 'credit_card' | 'debit_card' | 'pix' | 'bank_transfer';
  public paymentStatus!: 'pending' | 'paid' | 'failed' | 'refunded';
  public shippingAddress!: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  public shippingMethod!: string;
  public shippingCost!: number;
  public shippingStatus!: 'pending' | 'processing' | 'shipped' | 'delivered';
  public trackingCode?: string;
  public notes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public cancelledAt?: Date;
  public completedAt?: Date;
}

Order.init(
  {
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
        key: 'id',
      },
    },
    items: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
    paymentMethod: {
      type: DataTypes.ENUM('credit_card', 'debit_card', 'pix', 'bank_transfer'),
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
      allowNull: false,
      defaultValue: 'pending',
    },
    shippingAddress: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    shippingMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    shippingStatus: {
      type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered'),
      allowNull: false,
      defaultValue: 'pending',
    },
    trackingCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
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
    cancelledAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'orders',
    indexes: [
      {
        fields: ['userId'],
      },
      {
        fields: ['status'],
      },
      {
        fields: ['paymentStatus'],
      },
      {
        fields: ['shippingStatus'],
      },
      {
        fields: ['createdAt'],
      },
    ],
    hooks: {
      beforeCreate: async (order) => {
        // Calcular o total do pedido incluindo frete
        order.total = order.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ) + order.shippingCost;
      },
      beforeUpdate: async (order) => {
        // Atualizar timestamps de status
        if (order.changed('status')) {
          if (order.status === 'cancelled') {
            order.cancelledAt = new Date();
          } else if (order.status === 'completed') {
            order.completedAt = new Date();
          }
        }
      },
    },
  }
);

// As associações serão definidas no arquivo index.ts para evitar referências circulares

export { Order, OrderItem, CartItem }; 