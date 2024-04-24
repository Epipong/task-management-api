import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';
import { TasksRepository } from 'src/repositories/tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.create({ data: createTaskDto });
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.findMany();
  }

  async findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOne(id);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.tasksRepository.update(id, updateTaskDto);
  }

  async remove(id: number): Promise<Task> {
    return this.tasksRepository.delete(id);
  }
}
