import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';
import { OfferModule } from './offer/offer.module';
import { RideModule } from './ride/ride.module';
import { RatingModule } from './rating/rating.module';
import { SecurityCodeModule } from './utilities/security-code/security-code.module';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [PrismaModule, PostModule, LocationModule, UserModule, OfferModule, RideModule, RatingModule, SecurityCodeModule, AuthModule, FirebaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
