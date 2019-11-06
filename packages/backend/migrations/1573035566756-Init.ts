import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1573035566756 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createDatabase("airlab", true);
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("DROP EXTENSION IF EXISTS 'uuid-ossp'");
    await queryRunner.dropDatabase("airlab", true);
  }
}
