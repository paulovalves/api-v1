import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormDatabaseService } from '@/database/typeorm/typeorm.database.service';
import { OpenapiService } from '@/config/api/openapi/openapi.service';

describe('AppController', () => {
  let appController: AppController;

  const mockTypeormDatabaseService = {
    createTypeOrmOptions: jest.fn().mockReturnValue({}),
  };

  const mockOpenapiService = {
    getSwaggerOptions: jest.fn().mockReturnValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: TypeormDatabaseService,
          useValue: mockTypeormDatabaseService,
        },
        {
          provide: OpenapiService,
          useValue: mockOpenapiService,
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should render Hello World', async () => {
    const view = appController.getHello();
    expect(view).toEqual('Hello World');
  });
});
