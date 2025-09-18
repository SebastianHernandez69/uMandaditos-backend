import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PostModule } from 'src/post/post.module';
import { OfferGateway } from './offer.gateway';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  controllers: [OfferController],
  providers: [OfferService, OfferGateway],
  imports: [PrismaModule, PostModule, FirebaseModule],
  exports: [OfferService]
})
export class OfferModule {}
