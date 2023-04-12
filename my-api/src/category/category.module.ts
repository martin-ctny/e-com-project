import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entity/product.entity';
import { ProductModule } from 'src/product/product.module';
import { CategoryController } from './controller/category.controller';
import { Category } from './entity/category.entity';
import { CategoryService } from './service/category.service';

@Module({
  imports: [ProductModule, TypeOrmModule.forFeature([Category, Product])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
