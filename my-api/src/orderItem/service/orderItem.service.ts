import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemCreateDto } from '../dto/orderItem-create';
import { OrderItemUpdateDto } from '../dto/orderItem-update';
import { OrderItem } from '../entity/orderItem.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderRepository: Repository<OrderItem>,
  ) {}

  async getAllOrderItems() {
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.product', 'product');

    console.log('query', query);

    return await query.getMany();

    // return await this.orderRepository.find();
  }

  async createOrderItem(data: OrderItemCreateDto) {
    try {
      console.log('data', data);

      return this.orderRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating order');
    }
  }

  async getOneOrderItemById(id: string) {
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .where('order.id = :id', { id });
    return await query.getOne();
  }

  async updateOrderItem(id: string, data: OrderItemUpdateDto) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    Object.assign(order, data);
    await this.orderRepository.save(order);
    return order;
  }

  async deleteOrderItem(id: string) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    await this.orderRepository.delete(id);
    return order;
  }
}
