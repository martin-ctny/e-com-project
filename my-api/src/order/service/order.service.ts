import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderCreateDto } from '../dto/order-create';
import { OrderUpdateDto } from '../dto/order-update';
import { Order } from '../entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAllOrders() {
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.userId', 'user')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.product', 'product');
    return await query.getMany();
  }

  async createOrder(data: OrderCreateDto) {
    try {
      return this.orderRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating order');
    }
  }

  async getOrderById(id: string) {
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.product', 'product')
      .where('order.id = :id', { id });
    return await query.getOne();
  }

  async updateOrder(id: string, data: OrderUpdateDto) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    Object.assign(order, data);
    await this.orderRepository.save(order);
    return order;
  }

  async deleteOrder(id: string) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    await this.orderRepository.delete(id);
    return order;
  }
}
