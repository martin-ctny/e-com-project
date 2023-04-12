import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SerializeOptions,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ProductCreateDto } from '../dto/product-create.dto';
import { ProductUpdateDto } from '../dto/product-update.dto';
import { Product } from '../entity/product.entity';

@SerializeOptions({
  strategy: 'excludeAll',
  groups: ['product'],
})
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllproducts(): Promise<Product[]> {
    return this.productService.getAllproducts();
  }

  @Get(':id')
  getOneProductById(@Param('id') id: string): Promise<Product | null> {
    return this.productService.findOneBy(id);
  }

  @Post()
  createProduct(@Body() data: ProductCreateDto): Promise<Product> {
    return this.productService.createProduct(data);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() data: ProductUpdateDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, data);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
