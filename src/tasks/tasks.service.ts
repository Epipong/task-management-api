import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';
import { TasksRepository } from 'src/repositories/tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async create(
    userId: number,
    createTaskDto: CreateTaskDto,
  ): Promise<Task | undefined> {
    return this.tasksRepository.create({ data: { ...createTaskDto, userId } });
  }

  async findAll({
    where = {},
  }: {
    where?: { [key: string]: unknown };
  } = {}): Promise<Task[] | undefined> {
    return this.tasksRepository.findMany({ where });
  }

  async findOne(id: number): Promise<Task | undefined> {
    return this.tasksRepository.findOne(id);
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task | undefined> {
    return this.tasksRepository.update(id, updateTaskDto);
  }

  async remove(id: number): Promise<Task | undefined> {
    return this.tasksRepository.delete(id);
  }
}
