import { User } from 'user/user.entity';
import { Question } from 'question/question.entity';
import { questions } from '../seed-data';

export class QuestionSeeder {
  public static async execute() {
    const user = await User.findOne();
    for (const question of questions) {
      await Object.assign(new Question(), question, {
        user,
      }).save();
    }
  }
}
