import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialDto } from './dto/credential.dto';
import { UsersRepository } from 'src/repositories/users.repertory';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async login(credential: CredentialDto) {
    const { email, password } = credential;
    const users = await this.usersRepository.findMany({
      where: { email, password },
    });
    if (users.length === 0) {
      throw new BadRequestException('email or password are invalid');
    }
    const user = users[0];
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
