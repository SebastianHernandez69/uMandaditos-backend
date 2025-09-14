import { Module } from '@nestjs/common';
import { SecurityCodeService } from './security-code.service';

@Module({
  providers: [SecurityCodeService],
  exports: [SecurityCodeService]
})
export class SecurityCodeModule {}
