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
            name: "name",
            type: "varchar",
          },
          {
            name: "mw",
            type: "int",
            unsigned: true,
            isNullable: true,
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
