import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderCreateDto } from '../dto/order-create';
import { OrderUpdateDto } from '../dto/order-update';
import { Order } from '../entity/order.entity';
import { OrderService } from '../service/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getOneOrderById(@Param('id') id: string): Promise<Order | null> {
    return this.orderService.getOrderById(id);
  }

  @Post()
  createOrder(@Body() data: OrderCreateDto): Promise<Order> {
    return this.orderService.createOrder(data);
  }

  @Put(':id')
  updateOrder(
    @Param('id') id: string,
    @Body() data: OrderUpdateDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(id, data);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string): Promise<Order> {
    return this.orderService.deleteOrder(id);
  }
}
