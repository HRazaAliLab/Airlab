import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePanelElement1573552696421 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "panel_element",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "panel_id",
            type: "int",
          },
          {
            name: "conjugate_id",
            type: "int",
          },
          {
            name: "dilution_type",
            type: "smallint",
            unsigned: true,
            default: 0,
          },
          {
            name: "concentration",
            type: "real",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: "FK_panel_element_to_panel",
            referencedTableName: "panel",
            columnNames: ["panel_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_panel_element_to_conjugate",
            referencedTableName: "conjugate",
            columnNames: ["conjugate_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
        ],
        indices: [
          {
            name: "IDX_panel_element_panel_id",
            columnNames: ["panel_id"],
          },
          {
            name: "IDX_panel_element_conjugate_id",
            columnNames: ["conjugate_id"],
          },
        ],
        uniques: [
          {
            name: "UQ_panel_element_panel_id_and_conjugate_id",
            columnNames: ["panel_id", "conjugate_id"],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("panel_element", true);
  }
}
