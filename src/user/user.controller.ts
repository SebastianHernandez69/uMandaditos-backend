import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    // TODO: calculate rating
    return this.userService.getUserById(parseInt(id));
  }
}
