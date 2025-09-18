import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Rating } from '@prisma/client';
import { ResponseDto } from 'src/common/dto/response.dto';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  
  @Post()
  async createRating(@Req() req: AuthenticatedRequest ,@Body() createRatingDto: CreateRatingDto): Promise<ResponseDto<Rating>> {
    return {
      data: await this.ratingService.createRating(createRatingDto, req.user.uid),
      message: 'Rating created successfully',
      success: true
    };
  }

  @Public()
  @Get('id/:id')
  async getRatingById(@Param('id') id: number): Promise<ResponseDto<Rating>> {
    return {
      data: await this.ratingService.getRatingById(+id),
      message: 'Rating retrieved successfully',
      success: true
    };
  }

  @Get('rated-user')
  async getRatingByRatedUserId(@Req() req: AuthenticatedRequest): Promise<ResponseDto<Rating[]>> {
    return {
      data: await this.ratingService.getRatingByRatedUserId(req.user.uid),
      message: 'Ratings retrieved successfully',
      success: true
    };
  }

  @Public()
  @Patch('id/:id')
  async updateRating(@Param('id') id: number, @Body() updateRatingDto: CreateRatingDto): Promise<ResponseDto<Rating>> {
    return {
      data: await this.ratingService.updateRating(+id, updateRatingDto),
      message: 'Rating updated successfully',
      success: true
    };
  }

  @Public()
  @Delete('id/:id')
  async deleteRating(@Param('id') id: number): Promise<ResponseDto<Rating>> {
    return {
      data: await this.ratingService.deleteRating(+id),
      message: 'Rating deleted successfully',
      success: true
    };
  }
  
}
