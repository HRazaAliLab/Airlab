import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1573040981376 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
            isNullable: true,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "password",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "activation_key",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "is_active",
            type: "boolean",
            default: false,
          },
          {
            name: "meta",
            type: "jsonb",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "NOW()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "NOW()",
          },
        ],
        indices: [
          {
            columnNames: ["email"],
          },
          {
            columnNames: ["activation_key"],
          },
          {
            columnNames: ["is_active"],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("user", true);
  }
}
