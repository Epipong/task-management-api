import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';
import { TasksRepository } from 'src/repositories/tasks.repository';
import { validate } from 'class-validator';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const errors = await validate(createTaskDto);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return this.tasksRepository.create({data: createTaskDto})
  }

  async findAll(): Promise<[Task[], number]> {
    return this.tasksRepository.findMany();
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
