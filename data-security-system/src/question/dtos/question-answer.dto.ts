import { IsNotEmpty, IsString } from 'class-validator';

export class QuestionAnswerDto {
  @IsNotEmpty()
  @IsString()
  questionText: string;

  @IsNotEmpty()
  @IsString()
  userAnswer: string;
}
