import { TUser } from '@diwi/contracts';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public async getHello(): Promise<string> {
    return await this.appService.getHello();
  }

  @Get('/users')
  public async getUsers(): Promise<TUser[]> {
    return await this.appService.getUsers();
  }
}
