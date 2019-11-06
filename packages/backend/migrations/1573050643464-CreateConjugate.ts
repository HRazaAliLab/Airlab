import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateConjugate1573050643464 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "conjugate",
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
            name: "lot_id",
            type: "int",
          },
          {
            name: "tag_id",
            type: "int",
          },
          {
            name: "contributor_id",
            type: "int",
          },
          {
            name: "finished_by",
            type: "int",
            isNullable: true,
          },
          {
            name: "finished_at",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "tube_number",
            type: "int",
            unsigned: true,
          },
          {
            name: "concentration",
            type: "varchar",
            isNullable: true,
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
            name: "labeled_at",
            type: "timestamp",
            default: "NOW()",
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
            referencedTableName: "lot",
            columnNames: ["lot_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            referencedTableName: "tag",
            columnNames: ["tag_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            referencedTableName: "user",
            columnNames: ["contributor_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            referencedTableName: "user",
            columnNames: ["finished_by"],
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
            columnNames: ["lot_id"],
          },
          {
            columnNames: ["tag_id"],
          },
          {
            columnNames: ["tube_number"],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("conjugate", true);
  }
}
