import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/repositories/users.repertory';
import { PrismaService } from 'src/prisma/prisma.service';
import user from 'src/fixtures/users';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  const prisma: PrismaService = global.prisma;

  beforeEach(async () => {
    const jwtService = new JwtService();
    const usersRepository = new UsersRepository(prisma);
    usersService = new UsersService(usersRepository);
    authService = new AuthService(jwtService, usersRepository);
    await usersService.create({ ...user, repeatPassword: user.password });
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should authenticate my account and receive a token', async () => {
    const credential = {
      email: user.email,
      password: user.password,
    };
    const token = await authService.login(credential);
    expect(token.access_token).toBeTruthy();
  });

  it('fails with invalid email', async () => {
    const invalidCredential = {
      email: 'tran.pauline@club.com',
      password: user.password,
    };
    try {
      await authService.login(invalidCredential);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('email not found');
    }
  });

  it('fails on wrong password', async () => {
    const invalidCredential = {
      email: user.email,
      password: 'Abcdef123@',
    };
    try {
      await authService.login(invalidCredential);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('password is invalid');
    }
  });
});
