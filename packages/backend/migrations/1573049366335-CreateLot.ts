import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLot1573049366335 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "lot",
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
            name: "reagent_id",
            type: "int",
          },
          {
            name: "provider_id",
            type: "int",
          },
          {
            name: "clone_id",
            type: "int",
          },
          {
            name: "requested_by",
            type: "int",
          },
          {
            name: "approved_by",
            type: "int",
          },
          {
            name: "ordered_by",
            type: "int",
          },
          {
            name: "received_by",
            type: "int",
          },
          {
            name: "finished_by",
            type: "int",
          },
          {
            name: "number",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "status",
            type: "varchar",
          },
          {
            name: "purpose",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "link",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "requested_at",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "approved_at",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "ordered_at",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "received_at",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "finished_at",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "is_low",
            type: "boolean",
            default: false,
          },
          {
            name: "deleted",
            type: "boolean",
            default: false,
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
          {
            name: "updated_at",
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
            referencedTableName: "reagent",
            columnNames: ["reagent_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            referencedTableName: "provider",
            columnNames: ["provider_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            referencedTableName: "clone",
            columnNames: ["clone_id"],
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
            columnNames: ["reagent_id"],
          },
          {
            columnNames: ["provider_id"],
          },
          {
            columnNames: ["clone_id"],
          },
          {
            columnNames: ["status"],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("lot", true);
  }
}
