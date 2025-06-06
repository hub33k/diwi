import { beforeEach, describe, expect, it, jest } from 'bun:test';
import { Test, TestingModule } from '@nestjs/testing';
import { SurrealDbService } from '~/modules/surrealdb/surrealdb.service';
import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';

describe('AppController', () => {
  let appController: AppController;
  let surrealDbService: SurrealDbService;

  const mockSurrealDbService = {
    connect: jest.fn(),
    query: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      exports: [],
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: SurrealDbService,
          useValue: mockSurrealDbService,
        },
      ],
    }).compile();

    // await app.init(); // initializes all lifecycle hooks

    appController = app.get<AppController>(AppController);
    surrealDbService = app.get<SurrealDbService>(SurrealDbService);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      surrealDbService.query = jest.fn().mockResolvedValue([
        {
          accesses: {},
          analyzers: {},
          apis: {},
          configs: {},
          functions: {},
          models: {},
          params: {},
          tables: {},
          users: {},
        },
      ]);

      expect(await appController.getHello()).toBe('Hello World!');
    });
  });
});
