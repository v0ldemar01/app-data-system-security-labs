import { IsUUID } from 'class-validator';
import { CreateQuestionDto } from 'question/dtos';

export class QuestionDto extends CreateQuestionDto {
  @IsUUID()
  id: string;
}
