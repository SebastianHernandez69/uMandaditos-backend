import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationResponseDto } from './dto/location-response.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Public()
  @Get()
  async getAllLocations(): Promise<ResponseDto<LocationResponseDto[]>> {
    return {
      data: await this.locationService.getAllLocations(),
      message: 'Locations found',
      success: true,
    };
  }

  @Public()
  @Get(':id')
  async getLocationById(@Param('id') id: string): Promise<ResponseDto<LocationResponseDto>> {
    return {
      data: await this.locationService.getLocationById(parseInt(id)),
      message: 'Location found',
      success: true,
    };
  }
}
