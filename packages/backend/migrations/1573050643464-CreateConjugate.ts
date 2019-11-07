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
            name: "FK_conjugate_2_group",
            referencedTableName: "group",
            columnNames: ["group_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_conjugate_2_group_user",
            referencedTableName: "group_user",
            columnNames: ["created_by"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_conjugate_2_lot",
            referencedTableName: "lot",
            columnNames: ["lot_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_conjugate_2_tag",
            referencedTableName: "tag",
            columnNames: ["tag_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_conjugate_contributor_id_2_user",
            referencedTableName: "user",
            columnNames: ["contributor_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_conjugate_finished_by_2_user",
            referencedTableName: "user",
            columnNames: ["finished_by"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
        ],
        indices: [
          {
            name: "IDX_conjugate_group_id",
            columnNames: ["group_id"],
          },
          {
            name: "IDX_conjugate_created_by",
            columnNames: ["created_by"],
          },
          {
            name: "IDX_conjugate_lot_id",
            columnNames: ["lot_id"],
          },
          {
            name: "IDX_conjugate_tag_id",
            columnNames: ["tag_id"],
          },
          {
            name: "IDX_conjugate_tube_number",
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
