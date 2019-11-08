import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFile1573207197186 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "file",
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
            name: "extension",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "size",
            type: "int",
            isNullable: true,
          },
          {
            name: "hash",
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
        foreignKeys: [
          {
            name: "FK_file_2_group",
            referencedTableName: "group",
            columnNames: ["group_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_file_2_group_user",
            referencedTableName: "group_user",
            columnNames: ["created_by"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
        ],
        indices: [
          {
            name: "IDX_file_group_id",
            columnNames: ["group_id"],
          },
          {
            name: "IDX_file_created_by",
            columnNames: ["created_by"],
          },
          {
            name: "IDX_file_hash",
            columnNames: ["hash"],
          },
        ],
        // uniques: [
        //   {
        //     name: "UQ_file_hash",
        //     columnNames: ["hash"],
        //   },
        // ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("file", true);
  }
}
