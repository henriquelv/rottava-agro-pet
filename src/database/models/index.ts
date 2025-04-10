import sequelize from '../config';
import { User } from './User';
import { Category } from './Category';
import { Product } from './Product';
import { Image } from './Image';
import { Cart } from './Cart';
import { OrderItem, Order } from './Order';
import { Favorite } from './Favorite';

// Associações do Product
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Product.hasMany(Image, { foreignKey: 'productId', as: 'images' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });

// Associações do Category
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

// Associações do Image
Image.belongsTo(Product, { foreignKey: 'productId' });

// Associações do Order
Order.belongsTo(User, { foreignKey: 'userId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });

// Associações do OrderItem
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

// Associações do User
User.hasMany(Order, { foreignKey: 'userId' });

export {
  sequelize,
  User,
  Category,
  Product,
  Image,
  Cart,
  Order,
  OrderItem,
  Favorite
}; 