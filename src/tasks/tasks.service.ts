import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';
import { TasksRepository } from 'src/repositories/tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  create(createTaskDto: CreateTaskDto) {
    return createTaskDto;
  }

  async findAll(): Promise<[Task[], number]> {
    return this.tasksRepository.findMany({ queryType: 'findAndCount' });
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return updateTaskDto;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
