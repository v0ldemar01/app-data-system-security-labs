import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixAttemptAuthNumber1640881780144 implements MigrationInterface {
  name = 'fixAttemptAuthNumber1640881780144';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "attemptAuthNumber" TO "attemptErrorAuthNumber"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "attemptErrorAuthNumber" TO "attemptAuthNumber"`,
    );
  }
}
