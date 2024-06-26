import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from 'src/repositories/users.repertory';
import { User } from '@prisma/client';
import { hashPassword } from 'src/utils/password';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = {
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
      role: createUserDto.role,
    };
    const { password, repeatPassword } = createUserDto;
    if (password !== repeatPassword) {
      throw new BadRequestException([
        'repeatPassword must be equal to password',
      ]);
    }
    newUser.password = await hashPassword(password);
    return this.usersRepository.create({ data: newUser });
  }

  async findAll(): Promise<User[] | undefined> {
    return this.usersRepository.findMany();
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const { password } = updateUserDto;
    if (password) {
      updateUserDto.password = await hashPassword(password);
    }
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<User | undefined> {
    return this.usersRepository.delete(id);
  }
}
