import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideResponseDto } from './dto/ride-response.dto';
import { RideHistoryDto } from './dto/ride-history.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CreateRideDto } from './dto/create-ride.dto';
import { RideMinResponseDto } from './dto/ride-min-response.dto';
import { RideRunnerResponseDto } from './dto/ride-runner-response.dto';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Public()
  @Get('/:id')
  async getRideById(@Param('id') id: number): Promise<ResponseDto<RideResponseDto>> {
    return {
      data: await this.rideService.getRideById(+id),
      message: 'Ride found successfully',
      success: true
    };
  }

  @Get('/history')
  async getHistory(@Req() req: AuthenticatedRequest): Promise<ResponseDto<RideHistoryDto[]>> {
    return {
      data: await this.rideService.getHistory(req.user.uid),
      message: 'History found successfully',
      success: true
    };
  }

  @Public()
  @Post('/create')
  async createRide(@Body() createRideDto: CreateRideDto): Promise<ResponseDto<RideMinResponseDto>> {
    return {
      data: await this.rideService.createRide(createRideDto),
      message: 'Ride created successfully',
      success: true
    }
  }

  @Get('/deliveries-count')
  async getDeliveriesCount(@Req() req: AuthenticatedRequest): Promise<ResponseDto<number>> {
    return {
      data: await this.rideService.getDeliveriesCount(req.user.uid),
      message: 'Deliveries count found successfully',
      success: true
    };
  }

  @Get('/active-rides')
  async getActiveRidesByRunner(@Req() req: AuthenticatedRequest): Promise<ResponseDto<RideMinResponseDto[]>> {
    return {
      data: await this.rideService.getActiveRidesByRunner(req.user.uid),
      message: 'Active rides found successfully',
      success: true
    };
  }

  @Public()
  @Get('/post/:postId')
  async getRideByPostId(@Param('postId') postId: number): Promise<ResponseDto<RideRunnerResponseDto>> {
    return {
      data: await this.rideService.getRideByPostId(+postId),
      message: 'Ride found successfully',
      success: true
    };
  }

}
