import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './task.controller';
import { TasksService } from './task.service';
import { TaskResponse } from './schemas/task.schema';
import { Types } from 'mongoose';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTasks: TaskResponse[] = [
    {
      _id: new Types.ObjectId('5f8d04fe8bfa7c7fdeaf0c1a'),
      title: 'Test Task 1',
      description: 'Test Desc 1',
      isDone: false,
      id: '5f8d04fe8bfa7c7fdeaf0c1a',
    },
    {
      _id: new Types.ObjectId('5f8d04fe8bfa7c7fdeaf0c1b'),
      title: 'Test Task 2',
      description: 'Test Desc 2',
      isDone: true,
      id: '5f8d04fe8bfa7c7fdeaf0c1b',
    },
  ];

  const mockTasksService = {
    create: jest
      .fn()
      .mockImplementation((dto) =>
        Promise.resolve({ ...dto, id: new Types.ObjectId().toHexString() }),
      ),
    findAll: jest.fn().mockResolvedValue(mockTasks),
    findOne: jest
      .fn()
      .mockImplementation((id: string) =>
        Promise.resolve(mockTasks.find((task) => task.id === id)),
      ),
    update: jest
      .fn()
      .mockImplementation((id: string, dto) => Promise.resolve({ ...dto, id })),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: mockTasksService }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create and return a task', async () => {
      const dto = { title: 'New Task', description: 'New Desc', isDone: false };
      const result = await controller.create(dto);
      expect(result).toHaveProperty('id');
      expect(result.title).toBe(dto.title);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of tasks', async () => {
      const tasks = await controller.findAll();
      expect(tasks).toBe(mockTasks);
      tasks.forEach((task) => expect(task).toHaveProperty('id'));
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a task by ID', async () => {
      const id = mockTasks[0].id;
      const task = await controller.findOne(id);
      expect(task).toEqual(mockTasks.find((t) => t.id === id));
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update()', () => {
    it('should update and return a task', async () => {
      const id = mockTasks[0].id;
      const dto = {
        title: 'Updated Task',
        description: 'Updated Desc',
        isDone: true,
      };
      const updatedTask = await controller.update(id, dto);
      expect(updatedTask).toHaveProperty('id', id);
      expect(updatedTask.title).toBe(dto.title);
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove()', () => {
    it('should remove a task', async () => {
      const id = mockTasks[0].id;
      const result = await controller.remove(id);
      expect(result).toEqual({ deleted: true });
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
