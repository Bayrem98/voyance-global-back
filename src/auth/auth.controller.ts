import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUserInterceptor } from './user.interceptor';
import { AuthService } from './auth.service';
import { User } from 'src/user/schemas/user.schema';
import CreateUserDto from 'src/user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('me')
  async me(@Request() req): Promise<User | undefined> {
    console.log(req.user);
    return this.authService.getMe(req.user);
  }

  @Post('register')
  async register(@Body() newUser: CreateUserDto): Promise<User> {
    return this.authService.register(newUser);
  }

  @Post('login')
  async login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }
}
