import { createConnection } from 'typeorm';
import { UsersSeeder } from './users.seeder';

(async () => {
  try {
    await createConnection();
    await UsersSeeder.execute();
  } catch (err) {
    console.log('err', err);
  }
})();
