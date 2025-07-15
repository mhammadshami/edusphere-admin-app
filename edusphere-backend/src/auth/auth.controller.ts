import { AuthService } from './auth.service';
import { Request } from 'express';
import { UsersService } from './../users/users.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private UsersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register') 
  register(@Body() dto: CreateUserDto) {
    return this.UsersService.createUser(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto, @Req() req: Request) {
    return this.authService.login(dto, req);
  }

  @Post('refresh-token')
  refreshToken(@Body('refreshToken') token: string) {
    return this.authService.refreshAccessToken(token);
  }
}
