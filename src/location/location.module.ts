import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  imports: [PrismaModule],
  exports: [LocationService]
})
export class LocationModule {}
