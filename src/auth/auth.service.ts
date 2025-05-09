import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    const hashedPass = await bcrypt.hash(data.password, 12);
    data.password = hashedPass;
    return this.prisma.user.create({ data });
  }

  async login({ email, password }) {
    const checkUser = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
      throw new HttpException('Email or password invalid', 400);
    }
    const tokens = await this.generateTokens(checkUser.id, checkUser.email);
    return { user: checkUser, ...tokens };
  }

  async generateTokens(user_id: number, email: string) {
    const payload = { userId: user_id, email };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '2h',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async verifyToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (err) {
      throw new HttpException('Token invalid', 401);
    }
  }

  async profile(id: number) {
    return this.prisma.user.findFirst({ where: { id } });
  }
}
