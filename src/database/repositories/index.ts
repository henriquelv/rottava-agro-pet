import { UserRepository } from './UserRepository';
import { CategoryRepository } from './CategoryRepository';
import { ProductRepository } from './ProductRepository';
import { OrderRepository } from './OrderRepository';

export const userRepository = new UserRepository();
export const categoryRepository = new CategoryRepository();
export const productRepository = new ProductRepository();
export const orderRepository = new OrderRepository(); 