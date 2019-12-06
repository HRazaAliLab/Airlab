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
            name: "preffered_tag_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "isotype",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "epitope",
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
            name: "is_deleted",
            type: "boolean",
            default: false,
          },
          {
            name: "is_public",
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
          {
            name: "updated_at",
            type: "timestamptz",
            default: "NOW()",
          },
        ],
        foreignKeys: [
          {
            name: "FK_clone_to_group",
            referencedTableName: "group",
            columnNames: ["group_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_clone_to_member",
            referencedTableName: "member",
            columnNames: ["created_by"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_clone_to_protein",
            referencedTableName: "protein",
            columnNames: ["protein_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_clone_to_species",
            referencedTableName: "species",
            columnNames: ["species_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_clone_to_tag",
            referencedTableName: "tag",
            columnNames: ["preffered_tag_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
        ],
        indices: [
          {
            name: "IDX_clone_group_id",
            columnNames: ["group_id"],
          },
          {
            name: "IDX_clone_created_by",
            columnNames: ["created_by"],
          },
          {
            name: "IDX_clone_name",
            columnNames: ["name"],
          },
          {
            name: "IDX_clone_protein_id",
            columnNames: ["protein_id"],
          },
        ],
        // uniques: [
        //   {
        //     name: "UQ_clone_name_and_group_id",
        //     columnNames: ["name", "group_id"],
        //   },
        // ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("clone", true);
  }
}
