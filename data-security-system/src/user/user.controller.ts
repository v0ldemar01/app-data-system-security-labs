import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { SystemLogService } from 'system-log/system-log.service';
import { CreateUserDto } from 'user/dtos';
import { UserService } from 'user/user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly authService: UserService,
    private readonly systemLogService: SystemLogService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() newUser: CreateUserDto) {
    const user = await this.authService.createUser(newUser);
    await this.systemLogService.addSystemLog(
      {
        level: 'ok',
        message: `Create user is succeed`,
      },
      user.id,
    );
    return user;
  }
}
