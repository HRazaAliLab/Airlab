import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class EditTag1587473600410 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      "tag",
      new TableColumn({
        name: "is_enzyme",
        type: "boolean",
        default: false,
      })
    );
    await queryRunner.addColumn(
      "tag",
      new TableColumn({
        name: "is_biotin",
        type: "boolean",
        default: false,
      })
    );
    await queryRunner.addColumn(
      "tag",
      new TableColumn({
        name: "is_other",
        type: "boolean",
        default: false,
      })
    );
    await queryRunner.addColumn(
      "tag",
      new TableColumn({
        name: "description",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn("tag", "is_enzyme");
    await queryRunner.dropColumn("tag", "is_biotin");
    await queryRunner.dropColumn("tag", "is_other");
    await queryRunner.dropColumn("tag", "description");
  }
}
