import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AuthService } from 'auth/auth.service';
import { QuestionService } from 'question/question.service';
import JwtRefreshGuard from 'auth/guards/jwt-refresh.guard';
import { LocalAuthGuard } from 'auth/guards/local.guard';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import RefreshQuestionGuard from 'auth/guards/refresh-question.guard';
import { AuthUser } from 'user/user.decorator';
import { UserDto } from 'user/dtos';
import { QuestionAnswerDto } from 'question/dtos';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly questionService: QuestionService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@AuthUser() user: UserDto, @Res() res: FastifyReply) {
    const { accessToken, refreshToken } =
      await this.authService.manageJwtTokensSessions(user);
    const cookie = await this.authService.getCookieWithJwtAccessToken(
      accessToken,
    );
    res.header('Set-Cookie', cookie);
    res.send({ refreshToken });
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh-token')
  async refresh(
    @AuthUser() user: Pick<UserDto, 'id' | 'role'>,
    @Res() res: FastifyReply,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.manageJwtTokensSessions(user);
    const cookie = await this.authService.getCookieWithJwtAccessToken(
      accessToken,
    );
    res.header('Set-Cookie', cookie);
    res.send({ refreshToken });
  }

  @Post('refresh-by-question')
  @UseGuards(RefreshQuestionGuard)
  async refreshByQuestion(
    @Body() questionUserAnswer: QuestionAnswerDto,
    @AuthUser() user: Pick<UserDto, 'id' | 'role'>,
    @Res() res: FastifyReply,
  ) {
    await this.questionService.checkAnswerCorrectness(
      questionUserAnswer,
      user.id,
    );
    const { accessToken, refreshToken } =
      await this.authService.manageJwtTokensSessions(user);
    const cookie = await this.authService.getCookieWithJwtAccessToken(
      accessToken,
    );
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
