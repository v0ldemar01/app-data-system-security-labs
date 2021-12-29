import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { CreateUserDto } from 'user/dtos';
import { UserService } from 'user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() newUser: CreateUserDto) {
    return this.authService.createUser(newUser);
  }
}
