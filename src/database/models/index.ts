import Category from './Category';
import Product from './Product';
import Image from './Image';
import Order from './Order';
import OrderItem from './OrderItem';
import User from './User';

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
  Category,
  Product,
  Image,
  Order,
  OrderItem,
  User
}; 