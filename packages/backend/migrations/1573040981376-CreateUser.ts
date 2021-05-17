import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { getPasswordHash } from "../src/auth/helpers";
import { UserEntity } from "../src/user/user.entity";

export class CreateUser1573040981376 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "password",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "is_active",
            type: "boolean",
            default: false,
          },
          {
            name: "is_admin",
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
        uniques: [
          {
            name: "UQ_user_email",
            columnNames: ["email"],
          },
        ],
        indices: [
          {
            name: "IDX_user_email",
            columnNames: ["email"],
          },
          {
            name: "IDX_user_is_active",
            columnNames: ["is_active"],
          },
        ],
      }),
      true
    );

    // Create super-admin user
    const passwordHash = await getPasswordHash(process.env.FIRST_SUPERUSER_PASSWORD);
    const superadmin = new UserEntity();
    superadmin.email = process.env.FIRST_SUPERUSER;
    superadmin.isActive = true;
    superadmin.isAdmin = true;
    superadmin.password = passwordHash;
    await queryRunner.manager.save(superadmin);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("user", true);
  }
}
