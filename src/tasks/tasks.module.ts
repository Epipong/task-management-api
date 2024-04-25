import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { TasksRepository } from 'src/repositories/tasks.repository';
import { TasksController } from 'src/tasks/tasks.controller';
import { TasksService } from 'src/tasks/tasks.service';

@Module({
  controllers: [TasksController],
  providers: [PrismaService, TasksService, TasksRepository, JwtService],
  imports: [PrismaModule],
  exports: [TasksService],
})
export class TasksModule {}
