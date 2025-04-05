import User from './User';
import Product from './Product';
import Category from './Category';
import Image from './Image';
import Order from './Order';
import OrderItem from './OrderItem';

// Associações do User
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Associações do Product
Product.belongsTo(Category, { foreignKey: 'categoriaId' });
Category.hasMany(Product, { foreignKey: 'categoriaId' });

Product.hasMany(Image, { foreignKey: 'produtoId' });
Image.belongsTo(Product, { foreignKey: 'produtoId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

// Associações do Order
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

export {
  User,
  Product,
  Category,
  Image,
  Order,
  OrderItem,
}; 