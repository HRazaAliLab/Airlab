import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { UserEntity } from "./user/user.entity";
import { GroupEntity } from "./group/group.entity";
import { MemberEntity } from "./member/member.entity";
import { ProteinEntity } from "./protein/protein.entity";
import { ProviderEntity } from "./provider/provider.entity";
import { SpeciesEntity } from "./species/species.entity";
import { TagEntity } from "./tag/tag.entity";
import { ValidationFileEntity } from "./validationFile/validationFile.entity";
import { CloneEntity } from "./clone/clone.entity";
import { ConjugateEntity } from "./conjugate/conjugate.entity";
import { LotEntity } from "./lot/lot.entity";
import { PanelEntity } from "./panel/panel.entity";
import { ValidationEntity } from "./validation/validation.entity";
import { PanelElementEntity } from "./panelElement/panelElement.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: (process.env.TYPEORM_CONNECTION as "postgres") || "postgres",
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT || "5432"),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,

  entities: [
    UserEntity,
    GroupEntity,
    MemberEntity,
    ProteinEntity,
    ProviderEntity,
    SpeciesEntity,
    TagEntity,
    ValidationFileEntity,
    CloneEntity,
    ConjugateEntity,
    PanelEntity,
    PanelElementEntity,
    LotEntity,
    ValidationEntity,
  ],

  migrationsTableName: "migrations",
  migrations: ["src/migrations/*.ts"],

  ssl: false,
  synchronize: false,
});

export default AppDataSource;
