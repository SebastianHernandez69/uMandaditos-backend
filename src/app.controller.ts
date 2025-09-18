import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('ping')
  getPong(): string {
    return this.appService.getPong();
  }
}
