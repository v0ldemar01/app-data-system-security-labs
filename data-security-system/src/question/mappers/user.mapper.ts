import { Question } from 'question/question.entity';
import { QuestionDto } from 'question/dtos';

export class QuestionMapper {
  public static mapEntityToDTO(entity: Question): QuestionDto {
    const dto = new QuestionDto();
    dto.id = entity.id;
    dto.questionText = entity.questionText;
    dto.correctAnswer = entity.correctAnswer;
    return dto;
  }
}
