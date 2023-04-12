import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderItem } from '../entity/orderItem.entity';
import { OrderItemCreateDto } from '../dto/orderItem-create';
import { OrderItemUpdateDto } from '../dto/orderItem-update';
import { OrderItemService } from '../service/orderItem.service';

@Controller('orderItem')
export class OrderItemController {
  constructor(private orderService: OrderItemService) {}

  @Get()
  async getAllOrderItems() {
    return await this.orderService.getAllOrderItems();
  }

  @Get(':id')
  async getOneOrderItemById(@Param('id') id: string) {
    return await this.orderService.getOneOrderItemById(id);
  }

  @Post()
  async createOrderItem(@Body() data: OrderItemCreateDto) {
    return await this.orderService.createOrderItem(data);
  }

  @Put(':id')
  async updateOrderItem(
    @Param('id') id: string,
    @Body() data: OrderItemUpdateDto,
  ) {
    return await this.orderService.updateOrderItem(id, data);
  }

  @Delete(':id')
  async deleteOrderItem(@Param('id') id: string) {
    return await this.orderService.deleteOrderItem(id);
  }
}
