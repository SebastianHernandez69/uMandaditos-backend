import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Rating } from '@prisma/client';
import { ResponseDto } from 'src/common/dto/response.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async createRating(@Body() createRatingDto: CreateRatingDto): Promise<ResponseDto<Rating>> {
    return {
      data: await this.ratingService.createRating(createRatingDto),
      message: 'Rating created successfully',
      success: true
    };
  }

  @Get(':id')
  async getRatingById(@Param('id') id: number): Promise<ResponseDto<Rating>> {
    return {
      data: await this.ratingService.getRatingById(id),
      message: 'Rating retrieved successfully',
      success: true
    };
  }

  @Get('rated-user/:ratedUserId')
  async getRatingByRatedUserId(@Param('ratedUserId') ratedUserId: number): Promise<ResponseDto<Rating[]>> {
    return {
      data: await this.ratingService.getRatingByRatedUserId(ratedUserId),
      message: 'Ratings retrieved successfully',
      success: true
    };
  }

  @Patch(':id')
  async updateRating(@Param('id') id: number, @Body() updateRatingDto: CreateRatingDto): Promise<ResponseDto<Rating>> {
    return {
      data: await this.ratingService.updateRating(id, updateRatingDto),
      message: 'Rating updated successfully',
      success: true
    };
  }

  @Delete(':id')
  async deleteRating(@Param('id') id: number): Promise<ResponseDto<Rating>> {
    return {
      data: await this.ratingService.deleteRating(id),
      message: 'Rating deleted successfully',
      success: true
    };
  }
  
}
