import user from 'src/fixtures/users';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TasksRepository } from 'src/repositories/tasks.repository';
import { UsersRepository } from 'src/repositories/users.repertory';

describe('TasksService', () => {
  let tasksRepository: TasksRepository;
  let tasksService: TasksService;
  let usersRepository: UsersRepository;
  const prisma: PrismaService = global.prisma;

  beforeEach(async () => {
    usersRepository = new UsersRepository(prisma);
    tasksRepository = new TasksRepository(prisma);
    tasksService = new TasksService(tasksRepository);

    await prisma.user.create({
      data: user,
    });
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  it('should get all the tasks', async () => {
    const tasks = await tasksService.findAll();
    expect(tasks).toBeDefined();
    expect(tasks.length).toBeGreaterThanOrEqual(0);
  });

  it('should create a task', async () => {
    const newTask = { name: 'Learn Python' };
    const createdTask = await tasksService.create(user.id, newTask);
    expect(createdTask).toBeDefined();
    expect(createdTask.name).toEqual('Learn Python');
    expect(createdTask.id).toBeDefined();
  });

  it('should get a task by id given', async () => {
    const newTask = { name: 'Learn Rust' };
    const createdTask = await tasksService.create(user.id, newTask);
    const task = await tasksService.findOne(createdTask.id);
    expect(task).toBeDefined();
    expect(task.name).toEqual('Learn Rust');
  });

  it('should update a task by id given', async () => {
    const newTask = { name: 'Learn Rust' };
    const createdTask = await tasksService.create(user.id, newTask);
    const updatedTask = await tasksService.update(createdTask.id, {
      name: 'Learn Go',
    });
    expect(updatedTask.name).not.toEqual('Learn Rust');
  });

  it('should delete a task by id given', async () => {
    const newTask = { name: 'Learn Rust' };
    const createdTask = await tasksService.create(user.id, newTask);
    await tasksService.remove(createdTask.id);
    const tasks = await tasksService.findAll();
    expect(tasks.length).toEqual(0);
  });
});
