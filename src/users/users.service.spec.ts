import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from 'src/repositories/users.repertory';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, UsersService, UsersRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should create a user", async () => {
    const newUser = {
      username: 'john.doe',
      email: 'john.doe@club.com',
      password: 'Password@1',
      repeatPassword: 'Password@1'
    };
    const user = await service.create(newUser);
    expect(user).toBeDefined();
    expect(user.email).toEqual('john.doe@club.com');
  });
});
