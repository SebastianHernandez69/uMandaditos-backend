import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LocationModule } from '../location/location.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [PrismaModule, LocationModule, UserModule],
  exports: [PostService]
})
export class PostModule {}
