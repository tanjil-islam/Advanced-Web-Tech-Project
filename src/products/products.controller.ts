import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CurrentUser } from 'src/utility/common/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from './entities/product.entity';
import { AuthenticationGuard } from 'src/utility/common/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utility/common/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';
import { SerializeIncludes, SerializeInterceptor } from 'src/utility/common/interceptors/serialize.interceptor';
import { ProductsDto } from './dto/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post('add')
  async create(@Body() createProductDto: CreateProductDto,@CurrentUser() currentUser:UserEntity): Promise<ProductEntity>{
    return await this.productsService.create(createProductDto,currentUser);
  }

 @SerializeIncludes(ProductsDto)
  @Get('all')
 async findAll(@Query() query:any) :Promise<ProductsDto>{
    return await this.productsService.findAll(query);
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }

  @UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  @Patch('updateProduct/:id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@CurrentUser() currentUser:UserEntity):Promise<ProductEntity> {
    return await this.productsService.update(+id, updateProductDto,currentUser);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(+id);
  }
}
