import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class EditConjugate1587475530379 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      "conjugate",
      new TableColumn({
        name: "custom_id",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn("conjugate", "custom_id");
  }
}
