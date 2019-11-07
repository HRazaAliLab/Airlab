import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLot1573049366335 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "lot",
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
            name: "reagent_id",
            type: "int",
          },
          {
            name: "provider_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "clone_id",
            type: "int",
          },
          {
            name: "requested_by",
            type: "int",
            isNullable: true,
          },
          {
            name: "approved_by",
            type: "int",
            isNullable: true,
          },
          {
            name: "ordered_by",
            type: "int",
            isNullable: true,
          },
          {
            name: "received_by",
            type: "int",
            isNullable: true,
          },
          {
            name: "finished_by",
            type: "int",
            isNullable: true,
          },
          {
            name: "number",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "status",
            type: "varchar",
          },
          {
            name: "purpose",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "link",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "requested_at",
            type: "timestamptz",
            isNullable: true,
          },
          {
            name: "approved_at",
            type: "timestamptz",
            isNullable: true,
          },
          {
            name: "ordered_at",
            type: "timestamptz",
            isNullable: true,
          },
          {
            name: "received_at",
            type: "timestamptz",
            isNullable: true,
          },
          {
            name: "finished_at",
            type: "timestamptz",
            isNullable: true,
          },
          {
            name: "is_low",
            type: "boolean",
            default: false,
          },
          {
            name: "deleted",
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
            name: "FK_lot_2_group",
            referencedTableName: "group",
            columnNames: ["group_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_lot_2_group_user",
            referencedTableName: "group_user",
            columnNames: ["created_by"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_lot_2_reagent",
            referencedTableName: "reagent",
            columnNames: ["reagent_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_lot_2_provider",
            referencedTableName: "provider",
            columnNames: ["provider_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_lot_2_clone",
            referencedTableName: "clone",
            columnNames: ["clone_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
        ],
        indices: [
          {
            name: "IDX_lot_group_id",
            columnNames: ["group_id"],
          },
          {
            name: "IDX_lot_created_by",
            columnNames: ["created_by"],
          },
          {
            name: "IDX_lot_reagent_id",
            columnNames: ["reagent_id"],
          },
          {
            name: "IDX_lot_provider_id",
            columnNames: ["provider_id"],
          },
          {
            name: "IDX_lot_clone_id",
            columnNames: ["clone_id"],
          },
          {
            name: "IDX_lot_status",
            columnNames: ["status"],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("lot", true);
  }
}
