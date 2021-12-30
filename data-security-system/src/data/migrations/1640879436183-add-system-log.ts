import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSystemLog1640879436183 implements MigrationInterface {
  name = 'addSystemLog1640879436183';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "system_log" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "level" character varying NOT NULL DEFAULT 'ok', "message" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_fa0b9c6bd88ab76873fcf09f3a5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "system_log" ADD CONSTRAINT "FK_c1a7dc732f98730d0433e2b1a3f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "system_log" DROP CONSTRAINT "FK_c1a7dc732f98730d0433e2b1a3f"`,
    );
    await queryRunner.query(`DROP TABLE "system_log"`);
  }
}
