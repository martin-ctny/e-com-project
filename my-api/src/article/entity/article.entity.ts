import { Product } from 'src/product/entity/product.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  // @ManyToOne(() => Product, (product) => product.articles)
  // @JoinTable()
  // product: Product;
}
