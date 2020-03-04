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
            name: "clone_id",
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
            type: "smallint",
            unsigned: true,
            default: 0,
          },
          {
            name: "purpose",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "url",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "price",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "note",
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
            name: "is_archived",
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
            name: "FK_lot_to_group",
            referencedTableName: "group",
            columnNames: ["group_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_lot_to_member",
            referencedTableName: "member",
            columnNames: ["created_by"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_lot_to_clone",
            referencedTableName: "clone",
            columnNames: ["clone_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_lot_to_provider",
            referencedTableName: "provider",
            columnNames: ["provider_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_lot_requested_by_to_member",
            referencedTableName: "member",
            columnNames: ["requested_by"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_lot_approved_by_to_member",
            referencedTableName: "member",
            columnNames: ["approved_by"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_lot_ordered_by_to_member",
            referencedTableName: "member",
            columnNames: ["ordered_by"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_lot_received_by_to_member",
            referencedTableName: "member",
            columnNames: ["received_by"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_lot_finished_by_to_member",
            referencedTableName: "member",
            columnNames: ["finished_by"],
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
