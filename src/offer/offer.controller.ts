import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Body } from '@nestjs/common';
import { OfferResponseDto } from './dto/offer-response.dto';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}


  @Post()
  async createOffer(@Body() data: CreateOfferDto): Promise<ResponseDto<OfferResponseDto>> {
    return {
      data: await this.offerService.createOffer(data),
      message: 'Offer created successfully',
      success: true
    };
  }

  @Get(':id')
  async getOfferById(@Param('id') id: number): Promise<ResponseDto<OfferResponseDto>> {
    return {
      data: await this.offerService.getOfferById(+id),
      message: 'Offer found successfully',
      success: true
    };
  }

  @Get('post/:postId')
  async getOffersByPostId(@Param('postId') postId: number): Promise<ResponseDto<OfferResponseDto[]>> {
    return {
      data: await this.offerService.getOffersByPostId(+postId),
      message: 'Offers found successfully',
      success: true
    };
  }

  @Patch(':id')
  async updateOfferState(@Param('id') id: number, @Body() data: { state: boolean }): Promise<ResponseDto<OfferResponseDto>> {
    return {
      data: await this.offerService.updateOfferState(+id, data.state),
      message: 'Offer state updated successfully',
      success: true
    };
  }

  @Get('user/:userId/count')
  async getUserOffersAcceptedCount(@Param('userId') userId: number): Promise<ResponseDto<number>> {
    return {
      data: await this.offerService.getUserOffersAcceptedCount(+userId),
      message: 'User offers accepted count found successfully',
      success: true
    };
  }

  @Delete(':id')
  async deleteOffer(@Param('id') id: number): Promise<ResponseDto<boolean>> {
    return {
      data: await this.offerService.deleteOffer(+id),
      message: 'Offer deleted successfully',
      success: true
    };
  }

  @Get('user/:userId/accepted')
  async getOffersAcceptedByUserId(@Param('userId') userId: number): Promise<ResponseDto<OfferResponseDto[]>> {
    return {
        data: await this.offerService.getOffersAcceptedByUserId(+userId),
        message: 'Offers accepted found successfully',
        success: true
    };
  }
}
