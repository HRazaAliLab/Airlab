import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTag1573041004316 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "tag",
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
            name: "name",
            type: "varchar",
          },
          {
            name: "is_metal",
            type: "boolean",
            default: false,
          },
          {
            name: "is_fluorophore",
            type: "boolean",
            default: false,
          },
          {
            name: "mw",
            type: "smallint",
            unsigned: true,
            isNullable: true,
          },
          {
            name: "emission",
            type: "smallint",
            unsigned: true,
            isNullable: true,
          },
          {
            name: "excitation",
            type: "smallint",
            unsigned: true,
            isNullable: true,
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
        foreignKeys: [
          {
            name: "FK_tag_to_group",
            referencedTableName: "group",
            columnNames: ["group_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
        ],
        indices: [
          {
            name: "IDX_tag_group_id",
            columnNames: ["group_id"],
          },
        ],
        uniques: [
          {
            name: "UQ_tag_name_and_mw",
            columnNames: ["name", "mw"],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("tag", true);
  }
}
