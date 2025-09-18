import { Controller, Post, Req, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request';
import { RegisterUserExtraDataDto } from './dto/register-user-extradata.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('Firebase-auth')
  @ApiBody({ type: RegisterUserExtraDataDto, required: false })
  @Post('register')
  async register(
    @Req() req: AuthenticatedRequest, 
    @Body() extraData?: RegisterUserExtraDataDto
  ){
    return await this.authService.register(req, extraData || {});
  }

}
