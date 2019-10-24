import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "tblGroup",
})
export class Group {
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
}
