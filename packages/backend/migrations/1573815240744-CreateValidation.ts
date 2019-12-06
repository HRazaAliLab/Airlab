import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateValidation1573815240744 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "validation",
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
            isNullable: true,
          },
          {
            name: "lot_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "conjugate_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "species_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "file_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "application",
            type: "int",
            unsigned: true,
          },
          {
            name: "positive_control",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "negative_control",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "incubation_conditions",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "concentration",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "concentration_unit",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "tissue",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "fixation",
            type: "int",
            isNullable: true,
          },
          {
            name: "fixation_notes",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "notes",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "status",
            type: "int",
            default: 3,
          },
          {
            name: "antigen_retrieval_type",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "antigen_retrieval_time",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "antigen_retrieval_temperature",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "saponin",
            type: "boolean",
            isNullable: true,
            default: null,
          },
          {
            name: "saponin_concentration",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "methanol_treatment",
            type: "boolean",
            isNullable: true,
            default: null,
          },
          {
            name: "methanol_treatment_concentration",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "surface_staining",
            type: "boolean",
            isNullable: true,
            default: null,
          },
          {
            name: "surface_staining_concentration",
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
          {
            name: "updated_at",
            type: "timestamptz",
            default: "NOW()",
          },
        ],
        foreignKeys: [
          {
            name: "FK_validation_to_group",
            referencedTableName: "group",
            columnNames: ["group_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_validation_to_member",
            referencedTableName: "member",
            columnNames: ["created_by"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_validation_to_clone",
            referencedTableName: "clone",
            columnNames: ["clone_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_validation_to_lot",
            referencedTableName: "lot",
            columnNames: ["lot_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_validation_to_conjugate",
            referencedTableName: "conjugate",
            columnNames: ["conjugate_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
          {
            name: "FK_validation_to_species",
            referencedTableName: "species",
            columnNames: ["species_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
        ],
        indices: [
          {
            name: "IDX_validation_group_id",
            columnNames: ["group_id"],
          },
          {
            name: "IDX_validation_created_by",
            columnNames: ["created_by"],
          },
          {
            name: "IDX_validation_clone_id",
            columnNames: ["clone_id"],
          },
          {
            name: "IDX_validation_lot_id",
            columnNames: ["lot_id"],
          },
          {
            name: "IDX_validation_conjugate_id",
            columnNames: ["conjugate_id"],
          },
          {
            name: "IDX_validation_species_id",
            columnNames: ["species_id"],
          },
          {
            name: "IDX_validation_application",
            columnNames: ["application"],
          },
          {
            name: "IDX_validation_status",
            columnNames: ["status"],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("validation", true);
  }
}
