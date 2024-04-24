import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from 'src/repositories/users.repertory';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService, UsersRepository],
  imports: [PrismaModule],
  exports: [UsersService]
})
export class UsersModule {}
