import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: Response) {
    return res.render(this.appService.getHome(), {
      title: 'Api NestJS',
      description: 'Simple API example with NestJS',
    });
  }

  @Get('modules')
  getModules() {
    return this.appService.getModules();
  }
}
