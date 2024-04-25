import { ApiProperty } from '@nestjs/swagger';
import { Task } from '@prisma/client';
import { UserEntity } from 'src/users/entities/user.entity';

export class TaskEntity implements Task {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true, nullable: false })
  name: string;

  @ApiProperty()
  user: UserEntity;

  @ApiProperty()
  userId: number;
}
