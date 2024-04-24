import { Test, TestingModule } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { PrismaService } from "src/prisma/prisma.service";
import { TasksRepository } from "src/repositories/tasks.repository";

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

  it('should get the tasks', async () => {
    const tasks = await service.findAll();
    expect(tasks).toBeDefined();
    expect(tasks.length).toBeGreaterThanOrEqual(0);
  });
});
