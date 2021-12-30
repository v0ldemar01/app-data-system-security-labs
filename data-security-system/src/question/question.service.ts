import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from 'question/question.entity';
import { UserService } from 'user/user.service';
import { QuestionMapper } from 'question/mappers/user.mapper';
import {
  CreateQuestionDto,
  QuestionAnswerDto,
  QuestionDto,
} from 'question/dtos';
import {
  INCORRECT_ANSWER_QUESTION,
  INCORRECT_ANSWER_QUESTION_ATTEMPTS_ENDED,
  QUESTION_ALREADY_EXISTS,
} from 'question/constants/question.constant';
import { IGetConfig } from 'common/models';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private readonly userService: UserService,
  ) {}

  async getQuestions(config: IGetConfig): Promise<QuestionDto[]> {
    const { from: skip, count: take } = config;
    const entities = await this.questionRepository.find({
      skip,
      take,
      cache: true,
    });
    return entities.map((entity) => QuestionMapper.mapEntityToDTO(entity));
  }

  async createQuestion(
    newQuestion: CreateQuestionDto,
    userId: string,
  ): Promise<QuestionDto> {
    await this.checkIfQuestionAlreadyExists(newQuestion.questionText, userId);
    const entity = await this.questionRepository.save(newQuestion);
    return QuestionMapper.mapEntityToDTO(entity);
  }

  async checkIfQuestionAlreadyExists(
    questionText: string,
    userId: string,
  ): Promise<void> {
    const existingUser = await this.questionRepository.findOne({
      where: { questionText, userId },
    });
    if (existingUser) {
      throw new ConflictException(QUESTION_ALREADY_EXISTS);
    }
  }

  async checkAnswerCorrectness(
    { questionText, userAnswer }: QuestionAnswerDto,
    userId: string,
  ) {
    const existingQuestion = await this.questionRepository.findOne({
      where: { questionText, userId },
    });
    if (existingQuestion.correctAnswer !== userAnswer) {
      const { attemptAuthNumber } =
        await this.userService.getErrorAuthAttemptNumber(userId);
      if (attemptAuthNumber >= 3) {
        await this.userService.setUserBlocked(userId);
        throw new UnauthorizedException(
          INCORRECT_ANSWER_QUESTION_ATTEMPTS_ENDED,
        );
      }
      await this.userService.increaseErrorAuthAttempt(userId);
      throw new UnauthorizedException(INCORRECT_ANSWER_QUESTION);
    }
  }
}
