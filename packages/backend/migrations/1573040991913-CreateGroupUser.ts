import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGroupUser1573040991913 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "group_user",
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
            name: "user_id",
            type: "int",
          },
          {
            name: "role",
            type: "int",
            default: 0,
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
            isNullable: true,
          },
          {
            name: "can_order",
            type: "boolean",
            default: false,
            isNullable: true,
          },
          {
            name: "can_erase",
            type: "boolean",
            default: false,
            isNullable: true,
          },
          {
            name: "can_finances",
            type: "boolean",
            default: false,
            isNullable: true,
          },
          {
            name: "can_panels",
            type: "boolean",
            default: false,
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
            referencedTableName: "user",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
        ],
        indices: [
          {
            columnNames: ["group_id"],
          },
          {
            columnNames: ["user_id"],
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
    await queryRunner.dropTable("group_user", true);
  }
}
