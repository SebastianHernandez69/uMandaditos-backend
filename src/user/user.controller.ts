import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user-response.dto';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request';
import { UserPrivateResponseDto } from './dto/user-private-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Req() req: AuthenticatedRequest): Promise<UserResponseDto> {
    return this.userService.getUserById(req.user.uid);
  }

  @Get('private')
  async getUserPrivateProfile(@Req() req: AuthenticatedRequest): Promise<UserPrivateResponseDto> {
    return this.userService.getUserPrivateProfile(req.user.uid);
  }
}
