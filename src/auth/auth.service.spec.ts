import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/repositories/users.repertory';
import { PrismaService } from 'src/prisma/prisma.service';
import user from 'src/fixtures/users';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  const prisma: PrismaService = global.prisma;

  beforeEach(async () => {
    const jwtService = new JwtService();
    const usersRepository = new UsersRepository(prisma);
    authService = new AuthService(jwtService, usersRepository);

    await prisma.user.create({
      data: user,
    });
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

  it('should not receive a token', async () => {
    const invalidCredential = {
      email: 'tran.pauline@club.com',
      password: 'Abcdef123@',
    };
    try {
      await authService.login(invalidCredential);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('email or password are invalid');
    }
  });
});
