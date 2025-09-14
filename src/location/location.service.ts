import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocationResponseDto } from './dto/location-response.dto';


@Injectable()
export class LocationService {

    constructor(private readonly prisma: PrismaService) {}
    
    async getAllLocations(): Promise<LocationResponseDto[]> {
        return this.prisma.location.findMany();
    }

    async getLocationById(id: number): Promise<LocationResponseDto> {
        const location = await this.prisma.location.findUnique({ where: { id } });
        if (!location) {
            throw new NotFoundException('Location not found');
        }
        return location;
    }



}


