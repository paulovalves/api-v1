import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ApiExcludeController, ApiExcludeEndpoint } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHome(@Res() res: Response) {
    return res.render(this.appService.getHome(), {
      title: 'Api NestJS',
      description: 'Simple API example with NestJS',
    });
  }

  @Get('health')
  getHealth(@Res() res: Response) {
    return res.status(200).json({
      status: 'success',
      message: 'API is running',
    });
  }

  @Get('modules')
  getModules() {
    return this.appService.getModules();
  }

  @Get('hello')
  getHello(): string {
    return 'Hello World';
  }
}
