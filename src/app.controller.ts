import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index.hbs')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('modules')
  getModules() {
    return this.appService.getModules();
  }
}
