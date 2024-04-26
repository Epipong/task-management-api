import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Roles } from 'src/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Roles(['ADMIN', 'USER'])
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: { user: User },
  ) {
    const user = req.user;
    return this.tasksService.create(user.id, createTaskDto);
  }

  @Roles(['ADMIN', 'USER'])
  @Get()
  async findAll(@Request() req: { user: User }) {
    const user = req.user;
    return this.tasksService.findAll({ where: { userId: user.id } });
  }

  @Roles(['ADMIN', 'USER'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Roles(['ADMIN', 'USER'])
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: { user: User },
  ) {
    const user = req.user;
    return this.tasksService.update(+id, { ...updateTaskDto, userId: user.id });
  }

  @Roles(['ADMIN', 'USER'])
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: { user: User }) {
    const user = req.user;
    
    const tasks = await this.tasksService.findAll({
      where: {
        id,
      },
    });
    if (!tasks || tasks.length === 0) {
      throw new NotFoundException('Task not found');
    } else if (tasks[0].userId !== user.id) {
      throw new ForbiddenException('You cannot delete this task');
    }
    return this.tasksService.remove(+id);
  }
}
