import { createConnection } from 'typeorm';
import { QuestionSeeder } from './questions.seeder';
import { UsersSeeder } from './users.seeder';

(async () => {
  try {
    await createConnection();
    await UsersSeeder.execute();
    await QuestionSeeder.execute();
  } catch (err) {
    console.log('err', err);
  }
})();
