import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { BaseRepository } from './base.repository';

@Injectable()
export class TasksRepository extends BaseRepository<Task> {
  protected getEntity(): string {
    return 'task';
  }
}
