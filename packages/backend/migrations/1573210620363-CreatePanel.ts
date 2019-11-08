import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePanel1573210620363 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "panel",
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
            name: "name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "details",
            type: "jsonb",
            isNullable: true,
          },
          {
            name: "is_fluor",
            type: "boolean",
            default: false,
          },
          {
            name: "is_production",
            type: "boolean",
            default: false,
          },
          {
            name: "application",
            type: "int",
            unsigned: true,
            isNullable: true,
          },
          {
            name: "meta",
            type: "jsonb",
            isNullable: true,
          },
          {
            name: "is_deleted",
            type: "boolean",
            default: false,
          },
          {
            name: "created_at",
            type: "timestamptz",
            default: "NOW()",
          },
        ],
        foreignKeys: [
          {
            name: "FK_panel_2_group",
            referencedTableName: "group",
            columnNames: ["group_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_panel_2_group_user",
            referencedTableName: "group_user",
            columnNames: ["created_by"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
        ],
        indices: [
          {
            name: "IDX_panel_group_id",
            columnNames: ["group_id"],
          },
          {
            name: "IDX_panel_created_by",
            columnNames: ["created_by"],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("panel", true);
  }
}
