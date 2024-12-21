import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthenticationGuard } from 'src/utility/common/guards/authentication.guard';
import { CurrentUser } from 'src/utility/common/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ReviewEntity } from './entities/review.entity';
import { AuthorizeGuard } from 'src/utility/common/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  //@UseGuards(AuthenticationGuard)
  @Post('addReview')
  async create(@Body() createReviewDto: CreateReviewDto,@CurrentUser() currentUser:UserEntity):Promise<ReviewEntity> {
    return await this.reviewsService.create(createReviewDto,currentUser);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get('byProductId')
  async findAllByProduct(@Body('productId') productId:number){
    return await this.reviewsService.findAllByProduct(+productId);
  }

  @Get('single/:id')
 async findOne(@Param('id') id: string):Promise<ReviewEntity> {
    return await this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  //@UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
