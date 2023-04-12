import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entity/product.entity';
import { Repository } from 'typeorm';
import { CategoryCreateDto } from '../dto/category-create';
import { CategoryUpdateDto } from '../dto/category-update';
import { Category } from '../entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllCategories() {
    const query = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'products');
    return await query.getMany();
  }

  async createCategory(data: CategoryCreateDto) {
    try {
      return this.categoryRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating category');
    }
  }

  async findOneBy(id: string) {
    const query = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'products')
      .where('category.id = :id', { id });
    return await query.getOne();
  }

  async updateCategory(id: string, data: CategoryUpdateDto) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }
    Object.assign(category, data);
    await this.categoryRepository.save(category);
    return category;
  }

  async deleteCategory(id: string) {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
      relations: ['products'],
    });
    if (category) {
      if (category.products.length > 0) {
        for (const product of category.products) {
          await this.productRepository.delete(product.id);
        }
      }
      return await this.categoryRepository.remove(category);
    }
    return null;
  }
}
