import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from 'src/repositories/users.repertory';
import { User } from '@prisma/client';

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
      throw new BadRequestException('Both passwords must be the same');
    }

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
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<User | undefined> {
    return this.usersRepository.delete(id);
  }
}
