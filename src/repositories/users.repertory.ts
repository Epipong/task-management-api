import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { BaseRepository } from './base.repository';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  protected getEntity(): string {
    return 'user';
  }
}
