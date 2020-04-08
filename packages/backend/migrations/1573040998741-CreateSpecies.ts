import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSpecies1573040998741 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "species",
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
            name: "name",
            type: "varchar",
          },
          {
            name: "acronym",
            type: "varchar",
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
            name: "FK_species_to_group",
            referencedTableName: "group",
            columnNames: ["group_id"],
            referencedColumnNames: ["id"],
            onDelete: "cascade",
          },
        ],
        indices: [
          {
            name: "IDX_species_group_id",
            columnNames: ["group_id"],
          },
        ],
        uniques: [
          {
            name: "UQ_species_group_id_and_name",
            columnNames: ["group_id", "name"],
          },
          {
            name: "UQ_species_group_id_and_acronym",
            columnNames: ["group_id", "acronym"],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("species", true);
  }
}
