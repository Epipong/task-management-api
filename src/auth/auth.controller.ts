import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { AuthService } from './auth.service';
import { CredentialDto } from './dto/credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(RolesGuard)
  @Post('login')
  async login(@Body() credentialDto: CredentialDto) {
    return this.authService.login(credentialDto);
  }
}
