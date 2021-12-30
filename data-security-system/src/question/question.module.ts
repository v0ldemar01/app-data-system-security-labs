import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from 'question/question.entity';
import { User } from 'user/user.entity';
import { UserModule } from 'user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question, User]), UserModule],
  providers: [QuestionService],
  exports: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
