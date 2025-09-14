import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SecurityCodeModule } from 'src/utilities/security-code/security-code.module';

@Module({
  controllers: [RideController],
  providers: [RideService],
  exports: [RideService],
  imports: [PrismaModule, SecurityCodeModule]
})
export class RideModule {}
