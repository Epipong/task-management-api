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

  it('should create a user', async () => {
    const newUser = {
      username: 'john.doe',
      email: 'john.doe@club.com',
      password: 'Password@1',
      repeatPassword: 'Password@1',
    };
    const user = await service.create(newUser);
    expect(user).toBeDefined();
    expect(user.email).toEqual('john.doe@club.com');
  });

  it('should get all users', async () => {
    const newUser = {
      username: 'john.doe',
      email: 'john.doe@club.com',
      password: 'Password@1',
      repeatPassword: 'Password@1',
    };
    await service.create(newUser);
    const users = await service.findAll();
    expect(users.length).toEqual(1);
  });

  it('should get a user by id given', async () => {
    const newUser = {
      username: 'john.doe',
      email: 'john.doe@club.com',
      password: 'Password@1',
      repeatPassword: 'Password@1',
    };
    const createdUser = await service.create(newUser);
    const searchedUser = await service.findOne(createdUser.id);
    expect(searchedUser.username).toEqual('john.doe');
  });

  it('should update a user by id given', async () => {
    const newUser = {
      username: 'john.doe',
      email: 'john.doe@club.com',
      password: 'Password@1',
      repeatPassword: 'Password@1',
    };
    const createdUser = await service.create(newUser);
    const updatedUser = await service.update(createdUser.id, {
      password: 'Password@2',
    });
    expect(updatedUser.username).toEqual('john.doe');
    expect(updatedUser.password).not.toEqual('Password@1');
  });
});
