import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateReagent1573041348430 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "reagent",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "group_id",
            type: "int",
          },
          {
            name: "created_by",
            type: "int",
          },
          {
            name: "provider_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "name",
            type: "varchar",
            // isUnique: true,
            isNullable: true,
          },
          {
            name: "reference",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "deleted",
            type: "boolean",
            default: false,
            isNullable: true,
          },
          {
            name: "catched_info",
            type: "text",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "NOW()",
          },
        ],
        foreignKeys: [
          {
            referencedTableName: "group",
            columnNames: ["group_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            referencedTableName: "group_user",
            columnNames: ["created_by"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            referencedTableName: "provider",
            columnNames: ["provider_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
        ],
        indices: [
          {
            columnNames: ["group_id"],
          },
          {
            columnNames: ["created_by"],
          },
          {
            columnNames: ["provider_id"],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("reagent", true);
  }
}
