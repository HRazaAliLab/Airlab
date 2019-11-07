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
        uniques: [
          {
            name: "UQ_species_name",
            columnNames: ["name"],
          },
          {
            name: "UQ_species_acronym",
            columnNames: ["acronym"],
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
