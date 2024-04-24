import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TasksRepository } from 'src/repositories/tasks.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [PrismaService, TasksService, TasksRepository],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
