import { Order } from 'src/order/entity/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  Adresse: string;

  @Column({ type: 'varchar' })
  Ville: string;

  @Column({ type: 'varchar' })
  CodePostal: string;

  @Column({ type: 'varchar' })
  PhoneNumber: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Order, (order) => order.userId)
  orders: Order[];
}
