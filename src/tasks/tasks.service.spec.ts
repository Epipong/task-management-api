import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TasksRepository } from 'src/repositories/tasks.repository';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, TasksService, TasksRepository],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all the tasks', async () => {
    const tasks = await service.findAll();
    expect(tasks).toBeDefined();
    expect(tasks.length).toBeGreaterThanOrEqual(0);
  });

  it('should create a task', async () => {
    const newTask = { name: 'Learn Python' };
    const createdTask = await service.create(newTask);
    expect(createdTask).toBeDefined();
    expect(createdTask.name).toEqual('Learn Python');
    expect(createdTask.id).toBeDefined();
  });

  it('should get a task by id given', async () => {
    const newTask = { name: 'Learn Rust' };
    const createdTask = await service.create(newTask);
    const task = await service.findOne(createdTask.id);
    expect(task).toBeDefined();
    expect(task.name).toEqual('Learn Rust');
  });
});
