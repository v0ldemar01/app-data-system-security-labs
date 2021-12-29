import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AuthService } from 'auth/auth.service';
import JwtRefreshGuard from 'auth/guards/jwt-refresh.guard';
import { LocalAuthGuard } from 'auth/guards/local.guard';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { AuthUser } from 'user/user.decorator';
import { UserDto } from 'user/dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@AuthUser() user: UserDto, @Res() res: FastifyReply) {
    const cookie = await this.authService.getCookieWithJwtAccessToken(
      user.id,
      user.role,
    );
    const refreshToken = await this.authService.getJwtRefreshToken(user.id);
    res.header('Set-Cookie', cookie);
    res.send({ refreshToken });
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh-token')
  refresh(
    @AuthUser() user: Pick<UserDto, 'id' | 'role'>,
    @Res() res: FastifyReply,
  ) {
    const cookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
      user.role,
    );
    const refreshToken = this.authService.getJwtRefreshToken(user.id);
    res.header('Set-Cookie', cookie);
    res.send({ refreshToken });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(
    @AuthUser() user: Pick<UserDto, 'id' | 'role'>,
    @Res() res: FastifyReply,
  ) {
    const cookie = this.authService.getCookieForLogOut();
    res.header('Set-Cookie', cookie);
    res.send({ success: true });
  }
}
