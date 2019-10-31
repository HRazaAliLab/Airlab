import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "tblProtein",
})
export class ProteinEntity {
  @PrimaryGeneratedColumn({
    name: "proProteinId",
  })
  id: number;

  @Column({
    name: "proDescription",
  })
  description: string;

  @Column({
    name: "proKd",
  })
  kd: number;

  @Column({
    name: "proName",
  })
  name: string;

  @Column({
    name: "proNcbiGeneID",
  })
  proNcbiGeneId: string;

  @Column({
    name: "proSwissDBID",
  })
  proSwissDbId: string;

  @Column({
    name: "openBisPermId",
  })
  openBisPermId: string;

  @Column({
    name: "catchedInfo",
  })
  catchedInfo: string;

  @Column({
    name: "createdBy",
  })
  createdBy: number;

  @Column({
    name: "groupId",
  })
  groupId: number;

  @Column({
    name: "openBisCode",
  })
  openBisCode: string;

  @ManyToOne(type => GroupEntity, group => group.proteins)
  @JoinColumn({ name: "groupId" })
  group: GroupEntity;
}
