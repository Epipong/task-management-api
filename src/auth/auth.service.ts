import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialDto } from './dto/credential.dto';
import { UsersRepository } from 'src/repositories/users.repertory';
import { comparePasswords } from 'src/utils/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async login(credential: CredentialDto) {
    const { email, password } = credential;
    const users = await this.usersRepository.findMany({
      where: { email },
    });
    if (users.length === 0) {
      throw new NotFoundException('email not found');
    }
    const user = users[0];
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('password is invalid');
    }
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
