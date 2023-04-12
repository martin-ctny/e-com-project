import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/orderItem/entity/orderItem.entity';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addToCart(id: string, productId: string, quantity: number) {
    console.log('id', id);
  }
}

//   async removeFromCart(userId: string, orderItemId: string) {
//     const user = await User.findOne(userId);
//     if (!user) {
//       throw new Error(`User with ID ${userId} not found`);
//     }

//     const order = await this.orderRepository.findOne({
//       where: { user, status: 'cart' },
//       relations: ['orderItems'],
//     });

//     if (!order) {
//       throw new Error(`Cart not found for user with ID ${userId}`);
//     }

//     const orderItemIndex = order.orderItems.findIndex(
//       (item) => item.id === orderItemId,
//     );
//     if (orderItemIndex === -1) {
//       throw new Error(`Order item with ID ${orderItemId} not found in cart`);
//     }

//     const orderItem = order.orderItems[orderItemIndex];
//     order.orderItems.splice(orderItemIndex, 1);
//     await this.orderItemRepository.remove(orderItem);
//     await this.orderRepository.save(order);

//     return order;
//   }

//   async getCart(userId: string) {
//     const user = await User.findOne(userId);
//     if (!user) {
//       throw new Error(`User with ID ${userId} not found`);
//     }

//     const order = await this.orderRepository.findOne({
//       where: { user, status: 'cart' },
//       relations: ['orderItems'],
//     });

//     return order || { orderItems: [] };
//   }
// }
