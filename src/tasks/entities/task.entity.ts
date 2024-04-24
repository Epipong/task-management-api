import { ApiProperty } from '@nestjs/swagger';
import { Task } from '@prisma/client';

export class TaskEntity implements Task {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true, nullable: false })
  name: string;
}
