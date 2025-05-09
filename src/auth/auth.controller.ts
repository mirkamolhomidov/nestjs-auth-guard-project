import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/auth-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @Post('/register')
  async registerController(@Body() createUserDto: CreateUserDto) {
    return await this.service.register(createUserDto);
  }
  @Post('/login')
  async loginController(@Body() loginUserDto: LoginUserDto) {
    return await this.service.login(loginUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async profileController(@Req() req: any) {
    return await this.service.profile(req.user.userId);
  }
}
