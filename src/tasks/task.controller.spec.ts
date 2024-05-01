import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './task.controller';
import { TasksService } from './task.service';

describe('AppController', () => {
  let appController: TasksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    appController = app.get<TasksController>(TasksController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.findAll()).toBe('Hello World!');
    });
  });
});
