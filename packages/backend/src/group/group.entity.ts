import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProteinEntity } from "../protein/protein.entity";
import { PlateEntity } from "../plate/plate.entity";

@Entity({
  name: "tblGroup",
})
export class GroupEntity {
  @PrimaryGeneratedColumn({
    name: "grpGroupId",
  })
  id: number;

  @Column({
    name: "grpName",
  })
  name: string;

  @Column({
    name: "grpInstitution",
  })
  institution: string;

  @Column({
    name: "grpCoordinates",
  })
  coordinates: string;

  @Column({
    name: "catchedInfo",
  })
  catchedInfo: string;

  @Column({
    name: "createdBy",
  })
  createdBy: number;

  @Column({
    name: "grpUrl",
  })
  url: string;

  @Column({
    name: "grpAcceptRequests",
  })
  acceptRequests: boolean;

  @OneToMany(type => ProteinEntity, protein => protein.group)
  proteins: ProteinEntity[];

  @OneToMany(type => PlateEntity, plate => plate.group)
  plates: PlateEntity[];
}
