import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateValidationFile1574171528003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "validation_file",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "validation_id",
            type: "int",
          },
          {
            name: "created_by",
            type: "int",
          },
          {
            name: "hash",
            type: "varchar",
          },
          {
            name: "size",
            type: "int",
            isNullable: true,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "extension",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
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
            name: "FK_validation_file_to_validation",
            referencedTableName: "validation",
            columnNames: ["validation_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_validation_file_to_member",
            referencedTableName: "member",
            columnNames: ["created_by"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
        ],
        indices: [
          {
            name: "IDX_validation_file_validation_id",
            columnNames: ["validation_id"],
          },
          {
            name: "IDX_validation_file_created_by",
            columnNames: ["created_by"],
          },
          {
            name: "IDX_validation_file_hash",
            columnNames: ["hash"],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("validation_file", true);
  }
}
