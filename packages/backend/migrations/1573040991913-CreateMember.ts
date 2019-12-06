import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMember1573040991913 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "member",
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
            name: "user_id",
            type: "int",
          },
          {
            name: "role",
            type: "int",
            default: 0,
          },
          {
            name: "activation_key",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "is_active",
            type: "boolean",
            default: false,
          },
          {
            name: "can_order",
            type: "boolean",
            default: false,
          },
          {
            name: "can_erase",
            type: "boolean",
            default: false,
          },
          {
            name: "can_finances",
            type: "boolean",
            default: false,
          },
          {
            name: "can_panels",
            type: "boolean",
            default: false,
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
            name: "FK_member_to_group",
            referencedTableName: "group",
            columnNames: ["group_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_member_to_user",
            referencedTableName: "user",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
        ],
        indices: [
          {
            name: "IDX_member_group_id",
            columnNames: ["group_id"],
          },
          {
            name: "IDX_member_user_id",
            columnNames: ["user_id"],
          },
          {
            name: "IDX_member_activation_key",
            columnNames: ["activation_key"],
          },
          {
            name: "IDX_member_is_active",
            columnNames: ["is_active"],
          },
        ],
        uniques: [
          {
            name: "UQ_member_group_id_and_user_id",
            columnNames: ["group_id", "user_id"],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("member", true);
  }
}
