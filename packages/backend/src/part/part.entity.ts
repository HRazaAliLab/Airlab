import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "tblPart",
})
export class PartEntity {
  @PrimaryGeneratedColumn({
    name: "prtPartId",
  })
  id: number;

  @Column({
    name: "prtClosedAt",
  })
  closedAt: string;

  @Column({
    name: "prtEnsayoId",
  })
  ensayoId: number;

  @Column({
    name: "prtFileXtension",
  })
  fileXtension: string;

  @Column({
    name: "prtText",
  })
  text: string;

  @Column({
    name: "prtTitle",
  })
  title: string;

  @Column({
    name: "prtType",
  })
  prtType: string;

  @Column({
    name: "prtLanguage",
  })
  language: string;

  @Column({
    name: "prtTheme",
  })
  theme: string;

  @Column({
    name: "prtPosition",
  })
  position: number;

  @Column({
    name: "createdAt",
  })
  createdAt: string;

  @Column({
    name: "deleted",
  })
  deleted: boolean;

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

  @ManyToOne(type => GroupEntity, group => group.plates, {
    eager: false,
  })
  @JoinColumn({ name: "groupId" })
  group: GroupEntity;
}
