import { UserEntity } from "../src/user/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm";
import { getPasswordHash } from "../src/auth/helpers";

export class CreateSuperAdmin1573040981377 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const passwordHash = await getPasswordHash(process.env.FIRST_SUPERUSER_PASSWORD);
    const superadmin = new UserEntity();
    superadmin.email = process.env.FIRST_SUPERUSER;
    superadmin.isActive = true;
    superadmin.isAdmin = true;
    superadmin.password = passwordHash;
    await queryRunner.manager.save(superadmin);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager.delete(UserEntity, { email: process.env.FIRST_SUPERUSER });
  }
}
