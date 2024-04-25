import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from 'src/repositories/users.repertory';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [PrismaService, AuthService, UsersRepository, JwtService],
  imports: [PrismaModule],
  exports: [AuthService],
})
export class AuthModule {}
