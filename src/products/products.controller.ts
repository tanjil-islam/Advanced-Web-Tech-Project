import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CurrentUser } from 'src/utility/common/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('add')
  async create(@Body() createProductDto: CreateProductDto,@CurrentUser() currentUser:UserEntity): Promise<ProductEntity>{
    return await this.productsService.create(createProductDto,currentUser);
  }

  @Get('all')
 async findAll() :Promise<ProductEntity[]>{
    return await this.productsService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
