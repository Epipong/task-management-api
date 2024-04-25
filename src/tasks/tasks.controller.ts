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
  create(@Body() createTaskDto: CreateTaskDto, @Request() req: { user: User }) {
    const user: User = req.user;
    return this.tasksService.create(user.id, createTaskDto);
  }

  @Roles(['ADMIN', 'USER'])
  @Get()
  findAll(@Request() req: { user: User }) {
    const user: User = req.user;
    return this.tasksService.findAll({ where: { userId: user.id } });
  }

  @Roles(['ADMIN', 'USER'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Roles(['ADMIN', 'USER'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Roles(['ADMIN', 'USER'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
