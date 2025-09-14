import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PostModule } from 'src/post/post.module';

@Module({
  controllers: [OfferController],
  providers: [OfferService],
  imports: [PrismaModule, PostModule],
  exports: [OfferService]
})
export class OfferModule {}
