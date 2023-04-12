import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { ProductUpdateDto } from '../dto/product-update.dto';
import { ProductCreateDto } from '../dto/product-create.dto';

Injectable();
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllproducts() {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.orderItems', 'orderItems');
    return await query.getMany();
  }

  async createProduct(data: ProductCreateDto) {
    try {
      return this.productRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating product');
    }
  }

  async findOneBy(id: string) {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.orderItems', 'orderItems')
      .where('product.id = :id', { id });
    return await query.getOne();
  }

  async updateProduct(id: string, data: ProductUpdateDto) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    Object.assign(product, data);
    await this.productRepository.save(product);
    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    await this.productRepository.remove(product);
    return product;
  }
}
