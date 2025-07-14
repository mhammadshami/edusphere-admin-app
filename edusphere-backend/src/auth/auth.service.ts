import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto, request: Request) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMath = await bcrypt.compare(dto.password, user.password);
    if (!passwordMath) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        ipAddress: request.ip,
        userAgent: request.headers['user-agent'],
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(token: string) {
    const session = await this.prisma.session.findFirst({
      where: { refreshToken: token },
      include: {
        user: true,
      },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new ForbiddenException('Session expired or invalid!');
    }

    const payload = { sub: session.user.id, role: session.user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    return {
      accessToken,
    };
  }
}
