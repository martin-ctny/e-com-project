import { Order } from 'src/order/entity/order.entity';
import { Product } from 'src/product/entity/product.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('orderItem')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.orderItems, {
    cascade: true,
  })
  @JoinTable()
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinTable()
  order: Order;
}
