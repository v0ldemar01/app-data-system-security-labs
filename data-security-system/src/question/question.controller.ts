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
import { IGetConfig } from 'common/models';
import { CreateQuestionDto } from 'question/dtos';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';
import { AuthUser } from 'user/user.decorator';
import { UserDto } from 'user/dtos';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getQuestions(@Query() config: IGetConfig) {
    return this.questionService.getQuestions(config);
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() newQuestion: CreateQuestionDto,
    @AuthUser() user: Pick<UserDto, 'id' | 'role'>,
  ) {
    return this.questionService.createQuestion(newQuestion, user.id);
  }
}
