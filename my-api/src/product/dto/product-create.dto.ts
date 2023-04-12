import { MinLength } from 'class-validator';
import { CategoryUpdateDto } from 'src/category/dto/category-update';

export class ProductCreateDto {
  @MinLength(5, {
    message: 'Le titre doit contenir au moins 5 caractères',
  })
  title: string;
  description: string;
  price: number;
  category: CategoryUpdateDto;
}
