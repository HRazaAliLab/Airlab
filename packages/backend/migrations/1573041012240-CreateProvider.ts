import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProvider1573041012240 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "provider",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "meta",
            type: "jsonb",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamptz",
            default: "NOW()",
          },
        ],
        indices: [
          {
            name: "IDX_provider_name",
            columnNames: ["name"],
          },
        ],
        uniques: [
          {
            name: "UQ_provider_name",
            columnNames: ["name"],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("provider", true);
  }
}
