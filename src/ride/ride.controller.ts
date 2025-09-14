import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideResponseDto } from './dto/ride-response.dto';
import { RideHistoryDto } from './dto/ride-history.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CreateRideDto } from './dto/create-ride.dto';
import { RideMinResponseDto } from './dto/ride-min-response.dto';
import { RideRunnerResponseDto } from './dto/ride-runner-response.dto';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Get('/:id')
  async getRideById(@Param('id') id: number): Promise<ResponseDto<RideResponseDto>> {
    return {
      data: await this.rideService.getRideById(id),
      message: 'Ride found successfully',
      success: true
    };
  }

  @Get('/history/:userId')
  async getHistory(@Param('userId') userId: number): Promise<ResponseDto<RideHistoryDto[]>> {
    return {
      data: await this.rideService.getHistory(userId),
      message: 'History found successfully',
      success: true
    };
  }

  @Post('/create')
  async createRide(@Body() createRideDto: CreateRideDto): Promise<ResponseDto<RideMinResponseDto>> {
    return {
      data: await this.rideService.createRide(createRideDto),
      message: 'Ride created successfully',
      success: true
    }
  }

  @Get('/deliveries-count/:userId')
  async getDeliveriesCount(@Param('userId') userId: number): Promise<ResponseDto<number>> {
    return {
      data: await this.rideService.getDeliveriesCount(userId),
      message: 'Deliveries count found successfully',
      success: true
    };
  }

  @Get('/active-rides/:userId')
  async getActiveRidesByRunner(@Param('userId') userId: number): Promise<ResponseDto<RideMinResponseDto[]>> {
    return {
      data: await this.rideService.getActiveRidesByRunner(userId),
      message: 'Active rides found successfully',
      success: true
    };
  }

  @Get('/post/:postId')
  async getRideByPostId(@Param('postId') postId: number): Promise<ResponseDto<RideRunnerResponseDto>> {
    return {
      data: await this.rideService.getRideByPostId(postId),
      message: 'Ride found successfully',
      success: true
    };
  }

}
