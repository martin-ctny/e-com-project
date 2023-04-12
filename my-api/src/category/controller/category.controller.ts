import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryCreateDto } from '../dto/category-create';
import { CategoryUpdateDto } from '../dto/category-update';
import { Category } from '../entity/category.entity';
import { CategoryService } from '../service/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  getOneCategoryById(@Param('id') id: string): Promise<Category | null> {
    return this.categoryService.findOneBy(id);
  }

  @Post()
  createCategory(@Body() data: CategoryCreateDto): Promise<Category> {
    return this.categoryService.createCategory(data);
  }

  @Put(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() data: CategoryUpdateDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, data);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string): Promise<any> {
    return this.categoryService.deleteCategory(id);
  }
}
