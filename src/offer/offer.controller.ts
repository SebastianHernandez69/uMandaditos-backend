import { Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Body } from '@nestjs/common';
import { OfferResponseDto } from './dto/offer-response.dto';
import { UpdateOfferStateDto } from './dto/update-offer-state.dto';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}


  @Post()
  async createOffer(@Req() req: AuthenticatedRequest,@Body() data: CreateOfferDto): Promise<ResponseDto<OfferResponseDto>> {
    return {
      data: await this.offerService.createOffer(data, req.user.uid),
      message: 'Offer created successfully',
      success: true
    };
  }

  @Public()
  @Get(':id')
  async getOfferById(@Param('id') id: number): Promise<ResponseDto<OfferResponseDto>> {
    return {
      data: await this.offerService.getOfferById(+id),
      message: 'Offer found successfully',
      success: true
    };
  }

  @Public()
  @Get('post/:postId')
  async getOffersByPostId(@Param('postId') postId: number): Promise<ResponseDto<OfferResponseDto[]>> {
    return {
      data: await this.offerService.getOffersByPostId(+postId),
      message: 'Offers found successfully',
      success: true
    };
  }

  @Public()
  @Patch(':id')
  async updateOfferState(@Param('id') id: number, @Body() data: UpdateOfferStateDto): Promise<ResponseDto<OfferResponseDto>> {
    return {
      data: await this.offerService.updateOfferState(+id, data.state),
      message: 'Offer state updated successfully',
      success: true
    };
  }

  @Get('user/count')
  async getUserOffersAcceptedCount(@Req() req: AuthenticatedRequest): Promise<ResponseDto<number>> {
    return {
      data: await this.offerService.getUserOffersAcceptedCount(req.user.uid),
      message: 'User offers accepted count found successfully',
      success: true
    };
  }

  @Public()
  @Delete(':id')
  async deleteOffer(@Param('id') id: number): Promise<ResponseDto<boolean>> {
    return {
      data: await this.offerService.deleteOffer(+id),
      message: 'Offer deleted successfully',
      success: true
    };
  }

  @Get('user/accepted')
  async getOffersAcceptedByUserId(@Req() req: AuthenticatedRequest): Promise<ResponseDto<OfferResponseDto[]>> {
    return {
        data: await this.offerService.getOffersAcceptedByUserId(req.user.uid),
        message: 'Offers accepted found successfully',
        success: true
    };
  }
}
