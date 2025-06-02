import { TUser } from '@diwi/contracts';
import { Controller, Get } from '@nestjs/common';
import { Public } from '~/modules/auth/decorators/public.decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  public async getHello(): Promise<string> {
    return await this.appService.getHello();
  }

  @Get('/users')
  @Public()
  public async getUsers(): Promise<TUser[]> {
    return await this.appService.getUsers();
  }
}
