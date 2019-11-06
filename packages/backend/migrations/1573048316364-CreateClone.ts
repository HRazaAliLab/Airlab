import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClone1573048316364 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "clone",
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
            name: "protein_id",
            type: "int",
          },
          {
            name: "species_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "isotype",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "region",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "is_phospho",
            type: "boolean",
            default: false,
          },
          {
            name: "is_polyclonal",
            type: "boolean",
            default: false,
          },
          {
            name: "reactivity",
            type: "int",
            isArray: true,
            isNullable: true,
          },
          {
            name: "application",
            type: "jsonb",
            isNullable: true,
          },
          {
            name: "deleted",
            type: "boolean",
            default: false,
          },
          {
            name: "public",
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
            referencedTableName: "species",
            columnNames: ["species_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            referencedTableName: "protein",
            columnNames: ["protein_id"],
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
            columnNames: ["name"],
          },
          {
            columnNames: ["protein_id"],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("clone", true);
  }
}
