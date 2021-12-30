import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from 'question/question.service';
import { SystemLogService } from 'system-log/system-log.service';
import { IGetConfig } from 'common/models';
import { CreateQuestionDto } from 'question/dtos';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { AuthUser } from 'user/user.decorator';
import { UserDto } from 'user/dtos';

@Controller('questions')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly systemLogService: SystemLogService,
  ) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getQuestions(@Query() config: IGetConfig, @AuthUser() user) {
    const questions = await this.questionService.getQuestions(config);
    await this.systemLogService.addSystemLog(
      {
        level: 'ok',
        message: `Get questions with ${config.from} ${config.count} is succeed`,
      },
      user.id,
    );
    return questions;
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() newQuestion: CreateQuestionDto,
    @AuthUser() user: Pick<UserDto, 'id' | 'role'>,
  ) {
    const question = await this.questionService.createQuestion(
      newQuestion,
      user.id,
    );
    await this.systemLogService.addSystemLog(
      {
        level: 'ok',
        message: `Create question is succeed`,
      },
      user.id,
    );
    return question;
  }
}
