import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateReagent1573041348430 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "reagent",
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
            name: "provider_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "reference",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "is_deleted",
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
        foreignKeys: [
          {
            name: "FK_reagent_2_group",
            referencedTableName: "group",
            columnNames: ["group_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_reagent_2_group_user",
            referencedTableName: "group_user",
            columnNames: ["created_by"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_reagent_2_provider",
            referencedTableName: "provider",
            columnNames: ["provider_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
        ],
        indices: [
          {
            name: "IDX_reagent_group_id",
            columnNames: ["group_id"],
          },
          {
            name: "IDX_reagent_created_by",
            columnNames: ["created_by"],
          },
          {
            name: "IDX_reagent_provider_id",
            columnNames: ["provider_id"],
          },
        ],
        // uniques: [
        //   {
        //     name: "UQ_reagent_name_and_group_id",
        //     columnNames: ["name", "group_id"],
        //   },
        // ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("reagent", true);
  }
}
